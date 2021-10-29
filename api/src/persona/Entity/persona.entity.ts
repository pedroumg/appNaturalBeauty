import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('persona')
export class PersonaEntity{
    @PrimaryGeneratedColumn()
    idpersona:number;
    @Column('varchar',{length:500})
    nombre:string;
    @Column('varchar',{length:12})
    nit:string;
    @Column('text')
    direccion:string;
    @Column('varchar',{length:100})
    email:string;
    @Column('varchar',{length:12})
    telefono:string;
    @Column('varchar',{length:15,default:'Cliente'})
    tipo:string;
    @Column('varchar',{length:25,default:'Activo'})
    estado:string;
}