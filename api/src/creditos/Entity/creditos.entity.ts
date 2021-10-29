import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaEntity } from '../../persona/Entity/persona.entity';
import { VentasEntity } from '../../ventas/Entity/ventas.entity';

@Entity('credito')
export class CreditosEntity{

    @PrimaryGeneratedColumn()
    idcredito:number;

    @CreateDateColumn({type:'timestamp'})
    vencimientocredito:Date

    @Column({type:'decimal',precision:12,scale:2,default:0})
    anticipo:number;

    @Column({type:'decimal',precision:12,scale:2,default:0})
    saldopendiente:number;

    @Column('varchar',{length:500, default:'Activo'})
    estado:string;

    @ManyToOne(type=>PersonaEntity)
    @JoinColumn({name:'idpersona'})
    idpersona:number;

    @ManyToOne(type=>VentasEntity)
    @JoinColumn({name:'idventa'})
    idventa:number;
}