import { PartialType } from "@nestjs/swagger";
import { CreatePersonaDto } from "./create-persona.dto";

export class EditPersonaDto extends PartialType(CreatePersonaDto){}