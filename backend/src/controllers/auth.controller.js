import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAcessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const {
        name,
        last_name,
        birth_date,
        username,
        email,
        password,
        user_picture,
    } = req.body
    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            last_name,
            birth_date,
            username,
            email,
            password: passwordHash,
            user_picture
        })

        const userSaved = await newUser.save()

        const token = await createAcessToken({ id: userSaved.id })

        res.cookie('token', token)

        res.status(201).json({ 
            message: "User created successfully",
            user: {
                id: userSaved.id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
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

        res.status(201).json({ 
            message: "User logged successfully",
            user: {
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
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
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({ message: "User not found "})

    res.status(200).json({ 
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}