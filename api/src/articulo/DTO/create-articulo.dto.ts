import { IsDecimal, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateArticuloDto{
    @IsString()
    @IsOptional()
    codigo:string;
    @IsString()
    nombre:string;
    @IsInt()
    @IsPositive()
    stockminimo:number;
    
    @IsInt()
    @IsPositive()
    stockactual:number;

    @IsNumber()
    @IsPositive()
    preciocompra:number;
    @IsNumber()
    @IsPositive()
    preciosugerido:number;
    @IsNumber()
    @IsPositive()
    preciominimo:number;

    @IsString()
    @IsOptional()
    descripcion:string;
    @IsString()
    @IsOptional()
    imagen:string;
    @IsString()
    @IsOptional()
    estado:string;
    @IsInt()
    idcategoria:number;
}