import { Module } from "@nestjs/common";
import { RelationshipController } from "./relationship.controller";
import { RelationshipService } from "./relationship.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [RelationshipController],
  providers: [RelationshipService, PrismaService],
  exports: [RelationshipService],
})
export class RelationshipModule {}
