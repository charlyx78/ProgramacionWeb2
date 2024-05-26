import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAcessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import Follow from '../models/follow.model.js'
import { io } from "../index.js"

export const register = async (req, res) => {
    const {
        name,
        last_name,
        birth_date,
        biography,
        username,
        email,
        password,
        picture,
        cover_picture,
        tags
    } = req.body

    try {
        const usernameFound = await User.findOne({username})
        const emailFound = await User.findOne({email})
        
        if(usernameFound || emailFound) return res.status(400).json({
            message: "Username or email are already in use"
        })
        
        const passwordHash = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            name,
            last_name,
            birth_date,
            biography,
            username,
            email,
            password: passwordHash,
            picture: req.files && req.files['picture'] ? req.files['picture'][0].path : '',
            cover_picture: req.files && req.files['cover_picture'] ? req.files['cover_picture'][0].path : '',
            tags
        })
        
        const userSaved = await newUser.save()

        const token = await createAcessToken({ id: userSaved.id })

        res.cookie('token', token)

        res.status(201).json({ 
            message: "User created successfully",
            user: {
                id: userSaved.id,
                name: userSaved.name,
                last_name: userSaved.last_name,
                username: userSaved.username,
                email: userSaved.email,
                biography: userSaved.biography,
                picture: userSaved.picture,
                cover_picture: userSaved.cover_picture,
                followers: userSaved.followers,
                following: userSaved.following,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
                tags: userSaved.tags
            }
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const {
        email,
        password,
    } = req.body
    try {
        const userFound = await User.findOne({ email })

        if(!userFound) return res.status(400).json({ message: "User not found "})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" })
        
        const token = await createAcessToken({ id: userFound.id })

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })

        res.status(200).json({ 
            message: "User logged successfully",
            user: {
                id: userFound.id,
                name: userFound.name,
                last_name: userFound.last_name,
                username: userFound.username,
                email: userFound.email,
                picture: userFound.picture,
                cover_picture: userFound.cover_picture,
                followers: userFound.followers,
                following: userFound.following,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const hasFollow = async(req, res) => {
    try {
        const findFollow = await Follow.find({
            follow: req.params.id,
            user: req.user.id
        })

        if(findFollow.length == 0) {
            res.status(200).json({message: false})
        } else {
            res.status(200).json({message: true})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const follow = async(req, res) => {
    try {
        const findFollow = await Follow.find({
            follow: req.params.id,
            user: req.user.id,
            status: 'active'
        })

        if(findFollow.length == 0) {
            const newFollow = new Follow({
                follow: req.params.id,
                user: req.user.id
            })

            const followSaved = newFollow.save()

            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { followers: 1 } }
            )

            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $inc: { following: 1 } }
            )

            const userFollowers = await User.findById(req.params.id).select('followers')
            console.log(userFollowers)
            io.emit(`has-follow-${req.params.id}`, userFollowers.followers) 

            res.status(201).json({message: "Following user" , follow: followSaved})

        } else {
            res.status(400).json({message: "You already follow this user"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const unfollow = async(req, res) => {
    try {
        const findFollow = await Follow.findOne({
            follow: req.params.id,
            user: req.user.id,
            status: 'active'
        })

        if(findFollow) {
            await Follow.findOneAndDelete(
                { follow: req.params.id, user: req.user.id },
            )

            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { followers: -1 } }
            )

            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $inc: { following: -1 } }
            )

            const userFollowers = await User.findById(req.params.id).select('followers')
            console.log(userFollowers)
            io.emit(`has-follow-${req.params.id}`, userFollowers.followers) 

            res.status(200).json({ message: "User unfollowed" })

        } else {
            res.status(400).json({message: "You don't even follow this user"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).send("Logged out successfully")
}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findOne({ _id: req.params.id })
        if(!userFound) return res.status(404).json({ message: "User not found "})
    
        res.status(200).json({ 
            id: userFound._id,
            name: userFound.name,
            last_name: userFound.last_name,
            username: userFound.username,
            email: userFound.email,
            birth_date: userFound.birth_date,
            biography: userFound.biography,
            picture: userFound.picture,
            cover_picture: userFound.cover_picture,
            followers: userFound.followers,
            following: userFound.following,
            tags: userFound.tags,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const {
        name,
        last_name,
        birth_date,
        biography,
        username,
        email,
        password,
        tags
    } = req.body
    
    try {
        const passwordHash = await bcrypt.hash(password, 10)

        let updatedProfile

        if(req.files && req.files['picture'] && req.files['cover_picture']) {
            updatedProfile = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    last_name,
                    birth_date,
                    biography,
                    username,
                    email,
                    password: passwordHash,
                    picture: req.files['picture'][0].path,
                    cover_picture: req.files['cover_picture'][0].path,
                    tags
                },
                { new: true }
            )
        } else if(req.files && req.files['picture']) {
            updatedProfile = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    last_name,
                    birth_date,
                    biography,
                    username,
                    email,
                    password: passwordHash,
                    picture: req.files['picture'][0].path,
                    tags
                },
                { new: true }
            )
        } else if(req.files && req.files['cover_picture']) {
            updatedProfile = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    last_name,
                    birth_date,
                    biography,
                    username,
                    email,
                    password: passwordHash,
                    cover_picture: req.files['cover_picture'][0].path,
                    tags
                },
                { new: true }
            )
        } else {
            updatedProfile = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    last_name,
                    birth_date,
                    biography,
                    username,
                    email,
                    password: passwordHash,
                    tags
                },
                { new: true }
            )     
        }

        if (!updatedProfile) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedProfile
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export const verifyToken = async(req, res) => {
    const {token} = req.body
    if(!token) return res.status(401).json({message: "Unauthorized"})
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"})
        const userFound = await User.findById(user.id)

        if(!user) return res.status(401).json({message: "Unauthorized"})

        return res.json({
            id: userFound.id,
            name: userFound.name,
            last_name: userFound.last_name,
            username: userFound.username,
            email: userFound.email,
            picture: userFound.picture,
            cover_picture: userFound.cover_picture,
            followers: userFound.followers,
            following: userFound.following,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    })
}