import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { PORT } from './env-vars.js';
import pool from './db.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
    connectionStateRecovery: {
        tolerance: 3,
        delay: 3,
    },
});

io.on('connection', async (socket) => {
    console.log('a user connected');
    const [rows] = await pool.query('SELECT * FROM messages');
    rows.forEach((row) => {
        socket.emit('chat message', row.text);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', async (msg) => {
        console.log(`message: ${msg}`);
        await pool.query('INSERT INTO messages (text) VALUES (?)', [msg]);
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));
// Permitir todas las solicitudes CORS
app.use(cors());
app.get('/', async (req, res) => {
    const [rows] = await pool.query('SHOW TABLES');
    res.json(rows);
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
