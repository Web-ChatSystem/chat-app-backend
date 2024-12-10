import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RequestController } from "./request.controller";
import { RequestService } from "./request.service";
import { RelationshipModule } from "../relationship/relationship.module";
import { ConversationModule } from "../conversation/conversation.module";

@Module({
  imports: [RelationshipModule, ConversationModule],
  controllers: [RequestController],
  providers: [RequestService, PrismaService],
})
export class RequestModule {}
