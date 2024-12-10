import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional } from "class-validator";

export class CreateMessageDto {
  @ApiProperty()
  @Expose()
  conversationID: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @Expose()
  attachment: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  ownerID: string;
}
