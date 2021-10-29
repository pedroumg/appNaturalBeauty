import { PartialType } from "@nestjs/mapped-types";
import { CreateVentaDetalleDto } from "./create-ventadetalle.dto";

export class EditVentaDetallesDto extends PartialType(CreateVentaDetalleDto){}