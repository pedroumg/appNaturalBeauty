import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateVentasDto, EditVentasDto } from './DTO';
import { VentasEntity } from './Entity';
import { VentaDetalleEntity } from '../ventadetalle/Entity/';
import { CreateVentaDetalleDto } from 'src/ventadetalle/DTO';

@Injectable()
export class VentasService {
    constructor(
        @InjectRepository(VentasEntity) public readonly ventasRepository:Repository<VentasEntity>,
        @InjectRepository(VentaDetalleEntity) public readonly ventaDetalleRepository:Repository<VentaDetalleEntity>,
        private connection : Connection
        ){}
    async getAllItems(){
        const data = await this.ventasRepository.find({order: {idventa: 'DESC'},take: 100})
        if(!data)throw new NotFoundException('No se encontraron registros');
        return data;
    }

    async postItem(dto:CreateVentasDto){

        //Inicializamos la transaccion
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            //Realizamos Insert
            const resVenta = await queryRunner.manager.save(dto);
             
            
            const resVentaDetalle = await queryRunner.manager.save(resVenta.venta);
            //Commit de la Transaccion
            await queryRunner.commitTransaction();

            console.log(resVenta);
            console.log(resVentaDetalle);
            //Retornamos informacion del insert
            return resVenta;

        } catch (error) {
            //revertimos la transaccion si falla;
            await this.ventasRepository.queryRunner.rollbackTransaction();
            return error
        }
    }
    async putItem(id:number,dto:EditVentasDto){
        try {
            const data = await this.ventasRepository.findOne(id)
            if(!data)throw new NotFoundException('No se pudo actualizar el registro')
            const editedItem = Object.assign(data,dto)
            return await this.ventasRepository.save(editedItem)
        } catch (error) {
            return error
        }
    }

    async spAnularFactura(idventa:number){
        const data = await this.ventasRepository.query(`CALL spAnularFactura(${idventa})`)
       return data;
    }
}
