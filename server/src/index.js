import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));
// Permitir todas las solicitudes CORS
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
