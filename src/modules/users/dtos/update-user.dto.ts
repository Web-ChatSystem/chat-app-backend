import { IsDate, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { GenderType } from "../enums";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsUrl()
    avatar: string;

    @IsOptional()
    @IsDate()
    dob: Date;

    @IsOptional()
    @IsEnum(GenderType)
    gender: GenderType;
}