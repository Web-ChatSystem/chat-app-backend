import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MessageService } from "./message.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateMessageDto, MessageDto } from "./dtos";
import {
  ISuccessListRespone,
  ISuccessRespone,
} from "src/common/respone/interface";
import { MessageEntity } from "./message.entity";
import { arrDataToRespone, dataToRespone } from "src/common/respone/util";

@ApiTags("Message")
@Controller("message")
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get("list")
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @Query("conversationID") conversationID: string
  ): Promise<ISuccessListRespone<MessageDto>> {
    const results = await this.messageService.getMessages(conversationID);

    return arrDataToRespone(MessageDto)(results, results.length);
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Body() createMessageDto: CreateMessageDto
  ): Promise<ISuccessRespone<MessageEntity>> {
    const result = await this.messageService.createMessage(createMessageDto);

    return dataToRespone(MessageEntity)(result);
  }
}
