import { ApiProperty } from "@nestjs/swagger";
import { Relationship, RelationshipStatus } from "@prisma/client";

export class RelationshipEntity implements Relationship {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userID: string;

  @ApiProperty()
  friendID: string;

  @ApiProperty()
  status: RelationshipStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
