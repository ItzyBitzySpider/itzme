//import socket
import {Server} from 'socket.io';
import * as http from 'http';
import { app } from './api.js';
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log('user connected');
})


const port = 3001;
httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
