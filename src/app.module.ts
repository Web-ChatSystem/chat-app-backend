import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  AuthModule,
  RelationshipModule,
  RequestModule,
  UserModule,
  ParticipantModule,
  ConversationModule,
  MessageModule,
  MessageStatusModule,
  NicknameModule,
} from "./modules";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    ParticipantModule,
    UserModule,
    AuthModule,
    RelationshipModule,
    RequestModule,
    ConversationModule,
    MessageModule,
    MessageStatusModule,
    NicknameModule,
  ],
  controllers: [],
  providers: [PrismaService, ChatGateway],
})
export class AppModule { }
