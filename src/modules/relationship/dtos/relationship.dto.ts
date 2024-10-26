import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RelationShipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendID: string;
}
