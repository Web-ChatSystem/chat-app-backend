import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateMessageDto, MessageDto } from "./dtos";
import { MessageEntity } from "./message.entity";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }
  async getUserFromSocket(socket: Socket) {
    /*const user = await this.prisma.user.findUnique({
      where: {
        id: socket.handshake.query.userID.toString(),
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new WsException("Invalid Credentials");
    }*/

    return null;
  }

  async getMessages(conversationID: string): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        conversationID: conversationID,
      },
      select: {
        id: true,
        conversationID: true,
        attachment: true,
        owner: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return messages;
  }

  async createMessage(
    createMessageDto: CreateMessageDto
  ): Promise<MessageEntity> {
    const message = await this.prisma.message.create({
      data: {
        conversationID: createMessageDto.conversationID,
        attachment: createMessageDto.attachment,
        body: createMessageDto.body,
        ownerID: createMessageDto.ownerID,
      },
    });

    return message;
  }
}
