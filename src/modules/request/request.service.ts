import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateRequestDto, PendingRequestDto, SentRequestDto } from "./dtos";
import { RelationshipService } from "../relationship/relationship.service";
import { RequestEntity } from "./request.entity";
import { ConversationService } from "../conversation/conversation.service";

@Injectable()
export class RequestService {
  constructor(
    private prisma: PrismaService,
    private relationshipService: RelationshipService,
    private conversationService: ConversationService
  ) {}

  async createRequest(data: CreateRequestDto): Promise<RequestEntity> {
    const request = await this.prisma.request.findMany({
      where: { senderID: data.senderID, receiverID: data.receiverID },
    });

    if (request.length) {
      throw new ForbiddenException("request already sent");
    }

    return this.prisma.request.create({
      data: {
        senderID: data.senderID,
        receiverID: data.receiverID,
        status: "pending",
      },
    });
  }

  async getSentRequests(userID: string): Promise<SentRequestDto[]> {
    const data = await this.prisma.request.findMany({
      where: { senderID: userID, status: "pending" },
      include: { receiver: true },
    });
    const result = data.map((item) => {
      return {
        id: item.id,
        receiver: {
          id: item.receiver.id,
          email: item.receiver.email,
          username: item.receiver.username,
          avatar: item.receiver.avatar,
        },
      };
    });
    return result;
  }

  async getPendingRequests(userID: string): Promise<PendingRequestDto[]> {
    const data = await this.prisma.request.findMany({
      where: { receiverID: userID, status: "pending" },
      include: { sender: true },
    });
    const result = data.map((item) => {
      return {
        id: item.id,
        sender: {
          id: item.sender.id,
          email: item.sender.email,
          username: item.sender.username,
          avatar: item.sender.avatar,
        },
        createdAt: item.createdAt,
      };
    });
    return result;
  }

  async acceptRequest(requestID: string) {
    const data = await this.prisma.request.update({
      where: { id: requestID },
      data: { status: "accepted" },
    });

    await this.conversationService.createConversation({
      type: "individual",
      participantIDs: [data.senderID, data.receiverID],
    });

    return this.relationshipService.create({
      userID: data.senderID,
      friendID: data.receiverID,
    });
  }

  async rejectRequest(requestID: string) {
    return this.prisma.request.update({
      where: { id: requestID },
      data: { status: "rejected" },
    });
  }

  async deleteRequest(requestID: string) {
    return this.prisma.request.delete({ where: { id: requestID } });
  }
}
