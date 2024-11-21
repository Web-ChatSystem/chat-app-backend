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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) { }

  async handleConnection(socket: Socket) {
    await this.messageService.getUserFromSocket(socket);
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
    @MessageBody() roomName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const room = this.server.in(roomName);

    const roomSockets = await room.fetchSockets();
    const numberOfPeopleInRoom = roomSockets.length;

    // a maximum of 2 people in a room
    if (numberOfPeopleInRoom > 1) {
      room.emit('too_many_people');
      return;
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
  }
}
