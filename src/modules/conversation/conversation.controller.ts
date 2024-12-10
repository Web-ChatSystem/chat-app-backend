import { ApiTags } from "@nestjs/swagger";
import { ConversationService } from "./conversation.service";
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateConversationDto, ListConversationDto } from "./dtos";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { arrDataToRespone, dataToRespone } from "src/common/respone/util";
import {
  ISuccessListRespone,
  ISuccessRespone,
} from "src/common/respone/interface";

@ApiTags("Conversation")
@Controller("conversation")
export class ConversationController {
  constructor(private conversationService: ConversationService) { }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @Body() createConversationDto: CreateConversationDto
  ): Promise<string> {
    console.log("1 group conversation duoc tao ra", createConversationDto);
    const result = await this.conversationService.createConversation(
      createConversationDto
    );

    return result;
  }

  @Get("list")
  @UseGuards(JwtAuthGuard)
  async listConversation(
    @Query("userID") userID: string
  ): Promise<ISuccessListRespone<ListConversationDto>> {
    const result = await this.conversationService.listConversation(userID);
    return arrDataToRespone(ListConversationDto)(result, result.length);
  }

  @Get("")
  @UseGuards(JwtAuthGuard)
  async getConversation(
    @Query("id") id: string
  ): Promise<ISuccessRespone<ListConversationDto>> {
    const result = await this.conversationService.getConversation(id);
    return dataToRespone(ListConversationDto)(result);
  }

  @Get("individual")
  @UseGuards(JwtAuthGuard)
  async getIndividualConversation(
    @Query("userID") userID: string,
    @Query("friendID") friendID: string
  ) {
    return await this.conversationService.getIndividualConversation(
      userID,
      friendID
    );
  }
}