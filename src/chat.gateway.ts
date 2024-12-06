import { JwtService } from "@nestjs/jwt";
import { MessageService } from "./modules/message/message.service";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Conversation } from "@prisma/client";
import { ConversationService } from "./modules/conversation/conversation.service";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-frontend-v2-9xdq.vercel.app"],
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService, private readonly jwtService: JwtService, private readonly conversationService: ConversationService) { }

  async handleConnection(socket: Socket) {
    const token = socket.handshake.query.token.toString();
    if (!token) {
      socket.emit('error', 'Token is required');
      socket.disconnect();
      return;
    }
    try {
      const decoded = this.jwtService.verify(token, { secret: 'chat-app1' });
      //console.log('DECODED', decoded);
      const userId = decoded.sub;

      socket.join(`myroom-${userId}`);
      //console.log(`User ${userId} joined the room`);
      await this.messageService.getUserFromSocket(socket);
      socket.emit('ping', 'pong');
    } catch (err) {
      socket.emit('error', 'Invalid token');
      socket.disconnect();
    }
  }

  @SubscribeMessage("send_message")
  async listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.messageService.getUserFromSocket(socket);
    const message = await this.messageService.createMessage({
      conversationID: socket.handshake.query.conversationID.toString(),
      attachment: null,
      body: content,
      ownerID: author.id,
    });
    this.server.sockets.emit("receive_message", {
      author,
      content,
    });

    return message;
  }

  @SubscribeMessage("request_all_messages")
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    await this.messageService.getUserFromSocket(socket);
    const messages = await this.messageService.getMessages(
      socket.handshake.query.conversationID.toString()
    );

    socket.emit("send_all_messages", messages);
  }
  @SubscribeMessage('join_room')
  async joinRoom(
    @MessageBody() body: { roomName: string, userName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const roomName = body.roomName;
    const room = this.server.in(roomName);

    const roomSockets = await room.fetchSockets();
    const numberOfPeopleInRoom = roomSockets.length;

    // a maximum of 2 people in a room
    if (numberOfPeopleInRoom > 1) {
      room.emit('too_many_people');
      return;
    }
    if (numberOfPeopleInRoom === 0) {
      //room.emit('first_person_join', { roomName: roomName, callerName: body.userName });
      const conversation = await this.conversationService.getConversation(roomName);
      const participants = conversation.participants;
      participants.forEach((participant) => {
        console.log('ten nguoi goi cuoc goi', participant.user.username, body.userName);
        if (participant.user.username !== body.userName) {
          // Gửi thông báo vào phòng trừ người gọi (body.userName là người gọi)
          this.server.to(`myroom-${participant.user.id}`).emit('first_person_join', {
            roomName: roomName,
            callerName: body.userName,
          });
          console.log('caller trong Joinroom', participant.user.id);
        }
      });
    }
    if (numberOfPeopleInRoom === 1) {
      room.emit('another_person_ready');
    }

    socket.join(roomName);
  }

  @SubscribeMessage('send_connection_offer')
  async sendConnectionOffer(
    @MessageBody()
    {
      offer,
      roomName,
    }: {
      offer: RTCSessionDescriptionInit;
      roomName: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.in(roomName).except(socket.id).emit('send_connection_offer', {
      offer,
      roomName,
    });
  }

  @SubscribeMessage('answer')
  async answer(
    @MessageBody()
    {
      answer,
      roomName,
    }: {
      answer: RTCSessionDescriptionInit;
      roomName: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.in(roomName).except(socket.id).emit('answer', {
      answer,
      roomName,
    });
  }

  @SubscribeMessage('decline_call')
  async declineCall(
    @MessageBody() body: { roomName: string, userName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const roomName = body.roomName;
    const room = this.server.in(roomName);

    const roomSockets = await room.fetchSockets();
    const numberOfPeopleInRoom = roomSockets.length;

    const conversation = await this.conversationService.getConversation(roomName);
    const participants = conversation.participants;
    participants.forEach((participant) => {
      if (participant.user.username === body.userName) {
        // Gửi thông báo vào phòng trừ người gọi (body.userName là người gọi)
        this.server.to(`myroom-${participant.user.id}`).emit('call_declined', {
          roomName: roomName,
        });
        console.log('caller la ', participant.user.id, socket.id, body.userName);
      }
    });

    console.log(`Call in room ${roomName} was declined.`);
  }
  @SubscribeMessage('hangup')
  async handleHangup(
    @MessageBody() body: { roomName: string; userName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomName, userName } = body;

    // Gửi thông báo đến tất cả người dùng khác trong phòng
    this.server.in(roomName).except(socket.id).emit('call_ended', {
      roomName,
      message: `${userName} đã ngắt kết nối.`,
    });

    console.log(`User ${userName} đã ngắt kết nối khỏi phòng ${roomName}.`);
  }

  @SubscribeMessage('send_candidate')
  async sendCandidate(
    @MessageBody()
    {
      candidate,
      roomName,
    }: {
      candidate: unknown;
      roomName: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.in(roomName).except(socket.id).emit('send_candidate', {
      candidate,
      roomName,
    });
    //console.log('Candidate in backend', candidate, roomName);
  }
}
