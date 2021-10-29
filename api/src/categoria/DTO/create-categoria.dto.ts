import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto{
    @IsString()
    nombre:string;
    @IsString()
    descripcion:string;
    @IsString()
    @IsOptional()
    estado:string;
}