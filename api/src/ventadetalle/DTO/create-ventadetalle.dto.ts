import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { VentasEntity } from '../../ventas/Entity/ventas.entity';

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
    @IsOptional()
    idventa:number;
    
    @IsInt()
    idarticulo:number;
}