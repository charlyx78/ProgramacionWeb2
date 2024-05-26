import Message from "../models/message.model.js";
import { io } from "../index.js"
import User from '../models/user.model.js'

export const sendMessage = async (req, res) => {
    const {
        content
    } = req.body

    try {
        const newMessage = new Message({
            content,
            sender: req.user.id,
            receiver: req.params.id
        })

        const previousMessages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.id },
                { sender: req.params.id, receiver: req.user.id }
            ]
        });

        if (previousMessages.length === 0) {
            await User.findByIdAndUpdate(req.user.id, {
                $addToSet: { contacts: req.params.id }
            });

            await User.findByIdAndUpdate(req.params.id, {
                $addToSet: { contacts: req.user.id }
            });
        }

        const contacts = await User.findById(req.user.id).select('contacts')
        io.emit(`contacts-${req.user.id}`, contacts) 
        io.emit(`contacts-${req.params.id}`, contacts) 

        const messageSaved = await newMessage.save()

        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.id },
                { sender: req.params.id, receiver: req.user.id }
            ]
        }).populate('sender receiver')
        .sort({ createdAt: 1 })

        const roomId = [req.user.id, req.params.id].sort().join('-');
        io.to(roomId).emit('updateMessages', messages);

        res.status(201).json({
            message: "Message sended successfully",
            messageSaved
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.id },
                { sender: req.params.id, receiver: req.user.id }
            ]
        }).populate('sender receiver')
        .sort({ createdAt: 1 })

        if (messages.length == 0) return res.status(404).json({ message: "Messages not found" })

        res.status(200).json({
            messages
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await User.findById(req.user.id).select('contacts')
        if(!contacts) return res.status(404).json({ message: "User not found "})
    
        res.status(200).json({ 
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}