import { ApiProperty } from "@nestjs/swagger";
import { RelationshipStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateRelationshipDto {
  @ApiProperty()
  @IsEnum(RelationshipStatus)
  @IsNotEmpty()
  status: RelationshipStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendID: string;
}
