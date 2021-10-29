import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto{
    @IsString()
    nombre:string;

    @IsString()
    apellidos:string;
    
    @IsString()
    usuario:string;

    @IsString()
    @MinLength(8)
    @MaxLength(500)
    password:string;
    @IsString()
    @IsOptional()
    estado:string;
}