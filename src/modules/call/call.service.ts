import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class CallService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
    }

    startCall(socket: Socket, userId: string) {
        socket.broadcast.emit('start-call', userId);
    }

    acceptCall(socket: Socket, userId: string) {
        socket.broadcast.emit('accept-call', userId);
    }

    endCall(socket: Socket, userId: string) {
        socket.broadcast.emit('end-call', userId);
    }
}