import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { GenderType } from "../../users/enums";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsUrl()
    avatar: string;

    @IsDate()
    @IsNotEmpty()
    dob: Date;

    @IsEnum(GenderType)
    @IsNotEmpty()
    gender: GenderType;
};