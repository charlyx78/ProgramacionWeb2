import app from "./app.js";
import { connectDB } from "./db.js";
import { createServer } from 'http';
import { Server } from 'socket.io'

connectDB();

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    },
    pingTimeout: 60000
});

server.listen(3000, () => {
    console.log('App listening on port 3000');
});

io.on('connection', (socket) => {
    console.log('Connected to Socket.IO');
});

io.on('error', (error) => {
    console.error('Error en la conexión de Socket.IO:', error);
});