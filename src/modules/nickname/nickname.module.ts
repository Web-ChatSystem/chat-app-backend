import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { NicknameController } from "./nickname.controller";
import { NicknameService } from "./nickname.service";

@Module({
  controllers: [NicknameController],
  providers: [NicknameService, PrismaService],
})
export class NicknameModule {}
