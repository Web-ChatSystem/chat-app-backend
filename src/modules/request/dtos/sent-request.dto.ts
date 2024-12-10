import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SentRequestDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  receiver: {
    id: string;
    email: string;
    username: string;
    avatar: string;
  };
}
