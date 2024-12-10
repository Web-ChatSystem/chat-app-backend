import { ApiTags } from "@nestjs/swagger";
import { ParticipantService } from "./participant.service";
import { Controller } from "@nestjs/common";

@ApiTags("Participant")
@Controller("participant")
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}
}
