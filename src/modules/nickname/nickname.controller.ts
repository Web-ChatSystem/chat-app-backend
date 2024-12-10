import { ApiTags } from "@nestjs/swagger";
import { NicknameService } from "./nickname.service";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SetNicknameDto } from "./dtos";
import { dataToRespone } from "src/common/respone/util";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Nickname")
@Controller("nickname")
export class NicknameController {
  constructor(private nicknameService: NicknameService) { }

  @Post("/set")
  @UseGuards(JwtAuthGuard)
  async setNickname(@Body() data: SetNicknameDto) {
    const result = await this.nicknameService.setNickname(
      data.userID,
      data.conversationID,
      data.nickname
    );
    return dataToRespone(SetNicknameDto)(result);
  }
}
