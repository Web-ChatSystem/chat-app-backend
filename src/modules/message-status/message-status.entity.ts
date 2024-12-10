import { ApiProperty } from "@nestjs/swagger";
import { MessageStatus, MessageStatusType } from "@prisma/client";
import { Expose } from "class-transformer";

export class MessageStatusEntity implements MessageStatus {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  messageID: string;

  @ApiProperty()
  @Expose()
  type: MessageStatusType;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
