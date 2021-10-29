import { UsuarioEntity } from "src/usuario/Entity/usuario.entity";
import { Column, Entity,JoinTable,ManyToMany,PrimaryGeneratedColumn } from "typeorm";
@Entity('usuariopermiso')
export class UsuarioPermisoEntity{
    @PrimaryGeneratedColumn()
    idpermiso:number;
    @Column('varchar',{length:500})
    nombre:string;
    @Column('varchar',{length:100})
    icono:string;
    @Column('varchar',{length:100})
    path:string;
    @ManyToMany(type=>UsuarioEntity,usuario=>usuario.idusuario)
    usuario:UsuarioEntity[];
}