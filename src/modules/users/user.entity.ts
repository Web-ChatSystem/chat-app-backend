import { ApiProperty } from "@nestjs/swagger";
import { Gender, User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  gender: Gender;
}
