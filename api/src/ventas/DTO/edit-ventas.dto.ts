import { PartialType } from "@nestjs/mapped-types";
import { CreateVentasDto } from "./create-ventas.dto";

export class EditVentasDto extends PartialType(CreateVentasDto){}