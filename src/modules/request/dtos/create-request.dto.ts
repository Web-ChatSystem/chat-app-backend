import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRequestDto {
  @ApiProperty()
  @IsString()
  senderID: string;

  @ApiProperty()
  @IsString()
  receiverID: string;
}
