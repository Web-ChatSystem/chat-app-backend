import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SetNicknameDto {
  @ApiProperty()
  @IsString()
  @Expose()
  userID: string;

  @ApiProperty()
  @IsString()
  @Expose()
  conversationID: string;

  @ApiProperty()
  @IsString()
  @Expose()
  nickname: string;
}
