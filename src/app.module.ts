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
import { JwtModule } from "@nestjs/jwt";

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
    JwtModule,
  ],
  controllers: [],
  providers: [PrismaService, ChatGateway],
})
export class AppModule { }