import { PartialType } from "@nestjs/swagger";
import { CreateArticuloDto } from "./create-articulo.dto";

export class EditArticuloDto extends PartialType(CreateArticuloDto){}