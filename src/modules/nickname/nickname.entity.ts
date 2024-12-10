import { ApiProperty } from "@nestjs/swagger";
import { MessageStatusType, Nickname } from "@prisma/client";
import { Expose } from "class-transformer";

export class NicknameEntity implements Nickname {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  nickname: string;

  @ApiProperty()
  @Expose()
  userID: string;

  @ApiProperty()
  @Expose()
  conversationID: MessageStatusType;
}
