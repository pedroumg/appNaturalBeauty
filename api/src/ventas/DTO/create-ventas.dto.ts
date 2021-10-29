import { IsNumber,IsInt, IsOptional, IsPositive, IsString, IsDate, IsArray } from "class-validator";
import { CreateVentaDetalleDto } from '../../ventadetalle/DTO/create-ventadetalle.dto';


export class CreateVentasDto{

    @IsNumber()
    @IsOptional()
    idventa:number;
    
    @IsString()
    cliente:string;

    @IsDate()
    @IsOptional()
    fechaentrega:Date

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
    tipopago:string;
    
    @IsString()
    @IsOptional()
    estado:string;
    @IsInt()
    idpersona:number;
    @IsInt()
    idusuario:number;

    @IsArray()
    venta:CreateVentaDetalleDto[];
}