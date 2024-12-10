import { ApiProperty } from "@nestjs/swagger";
import { ConversationType } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateConversationDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  name?: string;

  @IsEnum(ConversationType)
  @ApiProperty()
  @Expose()
  type: ConversationType;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  image?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  creatorID?: string;

  @ApiProperty()
  @IsArray()
  @Expose()
  participantIDs: string[];
}