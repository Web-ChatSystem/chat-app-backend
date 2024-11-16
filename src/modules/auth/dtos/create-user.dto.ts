import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  dob: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;
}
