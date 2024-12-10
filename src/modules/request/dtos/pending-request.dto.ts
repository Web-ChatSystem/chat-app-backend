import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PendingRequestDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  sender: {
    id: string;
    email: string;
    username: string;
    avatar: string;
  };

  @Expose()
  @ApiProperty()
  createdAt: Date;
}
