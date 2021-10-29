import { ArticuloEntity } from "src/articulo/Entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categoria')
export class CategoriaEntity {
    @PrimaryGeneratedColumn()
  //  @OneToMany(type=>ArticuloEntity,articulo=>articulo.idcategoria)
    idcategoria:number
    @Column('varchar',{length:300})
    nombre:string;
    @Column({type:'text'})
    descripcion:string;
    @Column('varchar',{length:300,default:'Activo'})
    estado:string;
}