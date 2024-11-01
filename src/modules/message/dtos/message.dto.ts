import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MessageDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  conversationID: string;

  @ApiProperty()
  @Expose()
  attachment: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  owner: {
    id: string;
    username: string;
    avatar: string;
  };

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
