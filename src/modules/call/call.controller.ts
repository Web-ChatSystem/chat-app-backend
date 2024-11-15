import { Controller, Post, Param, ConnectedSocket } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CallService } from './call.service';

@Controller('calls')
export class CallController {
    constructor(private readonly callService: CallService) { }

    @Post('start/:userId')
    startCall(@Param('userId') userId: string, @ConnectedSocket() socket: Socket) {
        this.callService.startCall(socket, userId);
        return { message: 'Call started' };
    }

    @Post('accept/:userId')
    acceptCall(@Param('userId') userId: string, @ConnectedSocket() socket: Socket) {
        this.callService.acceptCall(socket, userId);
        return { message: 'Call accepted' };
    }

    @Post('end/:userId')
    endCall(@Param('userId') userId: string, @ConnectedSocket() socket: Socket) {
        this.callService.endCall(socket, userId);
        return { message: 'Call ended' };
    }
}
