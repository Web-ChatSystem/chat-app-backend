import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MessageStatusController } from "./message-status.controller";
import { MessageStatusService } from "./message-status.service";

@Module({
  controllers: [MessageStatusController],
  providers: [MessageStatusService, PrismaService],
})
export class MessageStatusModule {}
