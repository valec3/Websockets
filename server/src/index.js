import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', () => {
    console.log('a user connected');
});

app.use(logger('dev'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
