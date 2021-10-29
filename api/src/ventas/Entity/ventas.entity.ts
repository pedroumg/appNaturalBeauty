import { PersonaEntity } from "src/persona/Entity";
import { UsuarioEntity } from "src/usuario/Entity/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VentaDetalleEntity } from '../../ventadetalle/Entity/ventadetalle.entity';

@Entity('venta')
export class VentasEntity{
    @PrimaryGeneratedColumn()
    idventa:number
    @Column('varchar',{length:500})
    cliente:string;
    @Column('bigint')
    numero:number;
    @Column('varchar',{length:500})
    serie:string
    @CreateDateColumn({type:'timestamp'})
    fecha:Date

    @CreateDateColumn({type:'timestamp'})
    fechaentrega:Date

    @Column({type:'decimal',precision:12,scale:2,default:0})
    descuento:number;
    @Column({type:'decimal',precision:12,scale:2,default:0})
    anticipo:number;
    @Column({type:'decimal',precision:12,scale:2})
    total:number;

    @Column('varchar',{length:20,default:'Efectivo'})
    tipopago:string;

    @Column('varchar',{length:20,default:'Recibo'})
    tipo:string;
    @Column('varchar',{length:50,default:'Activo'})
    estado:string;
    
    @ManyToOne(type=>PersonaEntity)
    @JoinColumn({name:'idpersona'})
    idpersona:number;

    @ManyToOne(type=>UsuarioEntity,usuario=>usuario.idusuario)
    @JoinColumn({name:'idusuario'})
    idusuario:number;

    @OneToMany(() => VentaDetalleEntity, ventaDetalle => ventaDetalle.idventa)
    venta: VentaDetalleEntity[];
}