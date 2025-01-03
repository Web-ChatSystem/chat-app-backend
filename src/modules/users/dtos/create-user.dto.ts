import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  IsDateString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;
}
