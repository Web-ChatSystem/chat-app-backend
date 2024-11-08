import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NicknameService {
  constructor(private prisma: PrismaService) {}
  async setNickname(userID: string, conversationID: string, nickname: string) {
    const nicknameData = await this.prisma.nickname.findFirst({
      where: {
        userID: userID,
        conversationID: conversationID,
      },
    });

    if (nicknameData) {
      return this.prisma.nickname.update({
        where: {
          id: nicknameData.id,
        },
        data: {
          nickname: nickname,
        },
      });
    }

    return this.prisma.nickname.create({
      data: {
        userID: userID,
        conversationID: conversationID,
        nickname: nickname,
      },
    });
  }
}
