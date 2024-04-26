import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAcessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

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

    console.log(req.body)

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

        res.cookie('token', token)

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
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).send("Logged out successfully")
}

export const profile = async (req, res) => {
    try {
        console.log(req.params)
        const userFound = await User.findOne({ username: req.params.id })
        if(!userFound) return res.status(404).json({ message: "User not found "})
    
        res.status(200).json({ 
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
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyToken = async(req, res) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "Unauthorized"})
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
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
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    })
}