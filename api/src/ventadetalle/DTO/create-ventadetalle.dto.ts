import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateVentaDetalleDto{
    @IsNumber()
    @IsPositive()
    cantidad:number;

    @IsNumber()
    @IsPositive()
    preciocompra:number;

    @IsNumber()
    @IsOptional()
    descuento:number;

    @IsNumber()
    @IsPositive()
    precioventa:number;

    @IsInt()
    idventa:number;
    @IsInt()
    idarticulo:number;
}