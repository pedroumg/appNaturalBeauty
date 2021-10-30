import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentasDto, EditVentasDto } from './DTO';
import { VentasEntity } from './Entity';

@Injectable()
export class VentasService {
    constructor(@InjectRepository(VentasEntity) public readonly ventasRepository:Repository<VentasEntity>){}
    async getAllItems(){
        const data = await this.ventasRepository.find({order: {idventa: 'DESC'},take: 100})
        if(!data)throw new NotFoundException('No se encontraron registros');
        return data;
    }
    async postItem(dto:CreateVentasDto){
        try {
            const data = this.ventasRepository.create(dto)
            return await this.ventasRepository.save(data);
        } catch (error) {
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
