import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  AuthModule,
  RelationshipModule,
  RequestModule,
  UserModule,
  ParticipantModule,
  ConversationModule,
} from "./modules";
@Module({
  imports: [
    ParticipantModule,
    UserModule,
    AuthModule,
    RelationshipModule,
    RequestModule,
    ConversationModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
