import { ApiProperty } from "@nestjs/swagger";
import { Message } from "@prisma/client";
import { Expose } from "class-transformer";

export class MessageEntity implements Message {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  attachment: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  conversationID: string;

  @ApiProperty()
  @Expose()
  ownerID: string;
}
