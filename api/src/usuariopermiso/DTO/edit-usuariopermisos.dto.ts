import { PartialType } from "@nestjs/swagger";
import { CreateUsuarioPermisoDto } from "./create-usuariopermiso.dto";

export class EditUsuarioPermisosDto extends PartialType(CreateUsuarioPermisoDto){}