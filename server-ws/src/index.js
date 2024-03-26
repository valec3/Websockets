import express from 'express';
import { createServer } from 'http';
import ws from 'ws';

const app = express();
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
