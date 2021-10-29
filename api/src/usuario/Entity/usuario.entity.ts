import { hashSync } from "bcrypt";
import { UsuarioPermisoEntity } from "src/usuariopermiso/Entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    idusuario:number;
    @Column('varchar',{length:500})
    nombre:string;
    @Column('varchar',{length:500})
    apellidos:string;

    @Column('varchar',{length:30,unique:true})
    usuario:string;
    
    @Column({type:'text',select:false})//select : false = no devuelve esta columna al hacer un select
    password:string;
    @Column({type:'varchar',default:"Activo"})
    estado:string;
    @CreateDateColumn({type:'timestamp'})
    createdat:Date;
    @CreateDateColumn({type:'timestamp'})
    updatedat:Date;

    //Relación de Muchos a Muchos
    @ManyToMany(()=>UsuarioPermisoEntity,usuariopermiso=>usuariopermiso.idpermiso)
    @JoinTable({
        name:'usuariopermisoasignado',
        joinColumn:{name:'usuario_id'},
        inverseJoinColumn:{name:'permiso_id'}
    })
    usuariopermiso:UsuarioPermisoEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){return;}
        this.password = await hashSync(this.password,10)
        //Actualizamos la fecha despues de editar
        this.updatedat = new Date;
    }
}