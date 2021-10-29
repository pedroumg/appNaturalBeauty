import { IsOptional, IsString } from "class-validator";

export class CreatePersonaDto{
    @IsString()
    nombre:string;
    @IsString()
    nit:string;
    @IsString()
    direccion:string;
    @IsString()
    @IsOptional()
    email:string;
    @IsString()
    @IsOptional()
    telefono:string;
    @IsString()
    @IsOptional()
    tipo:string;
    @IsString()
    @IsOptional()
    estado:string;
}