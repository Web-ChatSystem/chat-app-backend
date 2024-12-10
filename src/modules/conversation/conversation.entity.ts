import { ApiProperty } from "@nestjs/swagger";
import { Conversation, ConversationType } from "@prisma/client";
import { Expose } from "class-transformer";

export class ConversationEntity implements Conversation {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  type: ConversationType;

  @ApiProperty()
  @Expose()
  image: string;

  @ApiProperty()
  @Expose()
  creatorID: string;
}