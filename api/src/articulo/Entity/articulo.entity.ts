import { CategoriaEntity } from "src/categoria/Entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('articulo')
export class ArticuloEntity {
    @PrimaryGeneratedColumn()
    idarticulo:number;
    @Column('varchar',{length:100})
    codigo:string;
    @Column('text')
    nombre:string;
    @Column({type:'bigint',width:15})
    stockminimo:number;
    @Column({type:'bigint',width:15})
    stockactual:number;
    @Column({type:'decimal',precision:12,scale:2})
    preciocompra:number;
    @Column({type:'decimal',precision:12,scale:2})
    preciosugerido:number;
    @Column({type:'decimal',precision:12,scale:2})
    preciominimo:number;
    @Column('text')
    descripcion:string;
    @Column({type:'varchar',length:100})
    imagen:string;
    @Column({type:'varchar',default:'Activo'})
    estado:string;
    @ManyToOne(()=>CategoriaEntity,categoria=>categoria.idcategoria)
    //@ManyToOne(type=>CategoriaEntity)
    @JoinColumn({ name: "idcategoria" })
    //categoria:CategoriaEntity
    idcategoria:number;
}