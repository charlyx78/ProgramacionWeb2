import app from "./app.js"
import { connectDB } from "./db.js"
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 3000;

connectDB();

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    },
    pingTimeout: 60000
});

server.listen(PORT, () => {
    console.log('App listening on port 3000');
});

io.on('connection', (socket) => {
    console.log('Connected to Socket.IO');
    
    socket.on('joinRoom', ({ userId1, userId2 }) => {
        const roomId = [userId1, userId2].sort().join('-');
        console.log(`Joined room: ${roomId}`);
        socket.join(roomId);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Leaving room: ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


io.on('error', (error) => {
    console.error('Error en la conexión de Socket.IO:', error);
});