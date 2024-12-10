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
<<<<<<< HEAD
  NicknameModule,
=======
  NicknameModule
>>>>>>> d14d300be87c97b7563ab46901ff3250584f432d
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
<<<<<<< HEAD
    NicknameModule,
    JwtModule,
=======
    NicknameModule
>>>>>>> d14d300be87c97b7563ab46901ff3250584f432d
  ],
  controllers: [],
  providers: [PrismaService, ChatGateway],
})
export class AppModule { }
