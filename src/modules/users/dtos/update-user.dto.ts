import { IsDate, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dob: Date;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;
}
