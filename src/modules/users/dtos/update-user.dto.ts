import { IsDate, IsDateString, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
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
  @IsDateString()
  @ApiProperty()
  dob: Date;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;
}
