import { ApiProperty } from "@nestjs/swagger";
import { Request, RequestStatus } from "@prisma/client";
import { Expose } from "class-transformer";

export class RequestEntity implements Request {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  senderID: string;

  @ApiProperty()
  @Expose()
  receiverID: string;

  @ApiProperty()
  @Expose()
  status: RequestStatus;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
