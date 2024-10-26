import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { ParticipantEntity } from "./participant.entity";

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async createParticipant(
    conversationID: string,
    userID: string
  ): Promise<ParticipantEntity> {
    const participant = await this.prisma.participant.create({
      data: {
        conversationID: conversationID,
        userID: userID,
      },
    });
    return participant;
  }

  async getParticipantsByConversationID(
    conversationID: string
  ): Promise<ParticipantEntity[]> {
    const participants = await this.prisma.participant.findMany({
      where: {
        conversationID: conversationID,
      },
      select: {
        id: true,
        userID: true,
        conversationID: true,
      },
    });

    return participants;
  }
}
