import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateConversationDto, ListConversationDto } from "./dtos";
import { ParticipantService } from "../participant/participant.service";

@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private participantService: ParticipantService
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto
  ): Promise<string> {
    const conversation = await this.prisma.conversation.create({
      data: {
        name: createConversationDto.name,
        type: createConversationDto.type,
        creatorID: createConversationDto.creatorID,
      },
    });

    createConversationDto.participantIDs.map(async (participantID) => {
      return await this.participantService.createParticipant(
        conversation.id,
        participantID
      );
    });

    return conversation.id;
  }

  async listConversation(userID: string): Promise<ListConversationDto[]> {

    const conversations = await this.prisma.conversation.findMany({
      where: {
        Participant: {
          some: {
            userID: userID,
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        creatorID: true,
        Participant: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        Nicknames: {
          select: {
            id: true,
            nickname: true,
            userID: true,
          },
        },
      },
    });

    const results = conversations.map((conversation) => ({
      id: conversation.id,
      name: conversation.name,
      type: conversation.type,
      creatorID: conversation.creatorID,
      participants: conversation.Participant.map((participant) => ({
        user: {
          id: participant.user.id,
          username: participant.user.username,
          nickname: conversation.Nicknames.find(
            (nickname) => nickname.userID === participant.user.id
          )?.nickname,
          avatar: participant.user.avatar,
        },
      })),
    }));
    return results;
  }

  
  async getIndividualConversation(userID: string, friendID: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        type: "individual",
        Participant: {
          every: {
            OR: [
              {
                userID: userID,
              },
              {
                userID: friendID,
              },
            ],
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        creatorID: true,
        Participant: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async getConversation(id: string): Promise<ListConversationDto> {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        creatorID: true,
        Participant: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        Nicknames: {
          select: {
            id: true,
            nickname: true,
            userID: true,
          },
        },
      },
    });

    const results = {
      id: conversation.id,
      name: conversation.name,
      type: conversation.type,
      creatorID: conversation.creatorID,
      participants: conversation.Participant.map((participant) => ({
        user: {
          id: participant.user.id,
          username: participant.user.username,
          nickname: conversation.Nicknames.find(
            (nickname) => nickname.userID === participant.user.id
          )?.nickname,
          avatar: participant.user.avatar,
        },
      })),
    };
    return results;
  }

}
