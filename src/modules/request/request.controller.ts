import {
  ISuccessListRespone,
  ISuccessRespone,
} from "src/common/respone/interface";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestService } from "./request.service";
import { RequestEntity } from "./request.entity";
import { arrDataToRespone, dataToRespone } from "src/common/respone/util";
import { CreateRequestDto, PendingRequestDto, SentRequestDto } from "./dtos";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Request")
@Controller("request")
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createRequest(
    @Body() createRequestDto: CreateRequestDto
  ): Promise<ISuccessRespone<RequestEntity>> {
    const data = await this.requestService.createRequest(createRequestDto);
    return dataToRespone(RequestEntity)(data);
  }

  @Get("sent/list")
  @UseGuards(JwtAuthGuard)
  async getSentRequestList(
    @Query("userID") userID: string
  ): Promise<ISuccessListRespone<SentRequestDto>> {
    const data = await this.requestService.getSentRequests(userID);
    return arrDataToRespone(SentRequestDto)(data, data.length);
  }

  @Get("pending/list")
  @UseGuards(JwtAuthGuard)
  async getPendingRequestList(
    @Query("userID") userID: string
  ): Promise<ISuccessListRespone<PendingRequestDto>> {
    const data = await this.requestService.getPendingRequests(userID);
    return arrDataToRespone(PendingRequestDto)(data, data.length);
  }

  @Put("accept/:id")
  async acceptRequest(@Param("id") id: string) {
    return await this.requestService.acceptRequest(id);
  }

  @Put("decline/:id")
  async declineRequest(@Param("id") id: string) {
    return await this.requestService.rejectRequest(id);
  }
}
