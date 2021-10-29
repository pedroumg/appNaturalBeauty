import { ArticuloEntity } from "src/articulo/Entity";
import { VentasEntity } from "src/ventas/Entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ventadetalle')
export class VentaDetalleEntity{
    @PrimaryGeneratedColumn()
    iddetalle:number;
    @Column({type:'decimal',precision:12,scale:2})
    cantidad:number;
    @Column({type:'decimal',precision:12,scale:2})
    preciocompra:number;
    @Column({type:'decimal',precision:12,scale:2,default:0})
    descuento:number;
    @Column({type:'decimal',precision:12,scale:2})
    precioventa:number;

    @ManyToOne(type=>VentasEntity)
    @JoinColumn({name:"idventa"})
    idventa:number;

    @ManyToOne(type=>ArticuloEntity)
    @JoinColumn({name:"idarticulo"})
    idarticulo:number;
}