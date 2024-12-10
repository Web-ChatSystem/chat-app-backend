import { ConversationService } from "./conversation.service";
import { Module } from "@nestjs/common";
import { ConversationController } from "./conversation.controller";
import { PrismaService } from "src/prisma.service";
import { ParticipantModule } from "../participant/participant.module";

@Module({
  imports: [ParticipantModule],
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService],
  exports: [ConversationService],
})
export class ConversationModule {}
