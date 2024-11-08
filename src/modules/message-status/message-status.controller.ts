import { ApiTags } from "@nestjs/swagger";
import { MessageStatusService } from "./message-status.service";
import { Controller } from "@nestjs/common";

@ApiTags("Message status")
@Controller("message-status")
export class MessageStatusController {
  constructor(private messageStatusService: MessageStatusService) {}
}
