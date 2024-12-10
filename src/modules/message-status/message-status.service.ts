import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageStatusService {
  constructor(private prisma: PrismaService) {}
}
