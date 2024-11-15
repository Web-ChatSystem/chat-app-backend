import { WebSocketGateway, OnGatewayInit, SocketGateway, MessageBody, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { CallService } from './call.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class CallGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;

    constructor(private readonly callService: CallService) { }

    afterInit(server: Server) {
        this.callService.setServer(server);
    }

    @SubscribeMessage('start-call')
    handleStartCall(@MessageBody() userId: string, socket: Socket) {
        this.callService.startCall(socket, userId);
    }

    @SubscribeMessage('accept-call')
    handleAcceptCall(@MessageBody() userId: string, socket: Socket) {
        this.callService.acceptCall(socket, userId);
    }

    @SubscribeMessage('end-call')
    handleEndCall(@MessageBody() userId: string, socket: Socket) {
        this.callService.endCall(socket, userId);
    }
}
