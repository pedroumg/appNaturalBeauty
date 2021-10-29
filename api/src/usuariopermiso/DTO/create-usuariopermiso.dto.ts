import { IsString } from "class-validator";

export class CreateUsuarioPermisoDto{
    @IsString()
    nombre:string;
    @IsString()
    icono:string;
    @IsString()
    path:string;
}