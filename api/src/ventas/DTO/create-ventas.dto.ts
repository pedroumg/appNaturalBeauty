import { IsNumber,IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateVentasDto{
    @IsString()
    cliente:string;

    @IsNumber()
    @IsPositive()
    numero:number;

    @IsString()
    @IsOptional()
    serie:string

    @IsNumber()
    @IsOptional()
    descuento:number;

    @IsNumber()
    @IsOptional()
    anticipo:number;

    @IsNumber()
    @IsPositive()
    total:number;

    @IsString()
    @IsOptional()
    tipo:string;
    
    @IsString()
    @IsOptional()
    estado:string;
    @IsInt()
    idpersona:number;
    @IsInt()
    idusuario:number;
}