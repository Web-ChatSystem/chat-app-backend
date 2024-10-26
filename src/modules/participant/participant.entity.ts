import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "@prisma/client";
import { Expose } from "class-transformer";

export class ParticipantEntity implements Participant {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  conversationID: string;

  @ApiProperty()
  @Expose()
  userID: string;
}
