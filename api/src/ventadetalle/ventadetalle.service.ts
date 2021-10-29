import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditVentaDetallesDto } from './DTO';
import { CreateVentaDetalleDto } from './DTO/create-ventadetalle.dto';
import { VentaDetalleEntity } from './Entity';

@Injectable()
export class VentadetalleService {
    constructor(@InjectRepository(VentaDetalleEntity) public readonly ventadetalleRepository:Repository<VentaDetalleEntity>){}
    async getAllItems(){
        const data = await this.ventadetalleRepository.find()
        if(!data[0])throw new NotFoundException('No se encontraron registros');
        return data;
    }
    async postItem(dto:CreateVentaDetalleDto){
        try {
            const data = this.ventadetalleRepository.create(dto) 
            return await this.ventadetalleRepository.save(data)   
        } catch (error) {
            return error
        }
    }

    async putItem(id:number,dto:EditVentaDetallesDto){
        try {
            const data = await this.ventadetalleRepository.findOne(id)
            if(!data)throw new NotFoundException(`No se encontró registro con el id ${id}`)
            const editedItem = Object.assign(data,dto)
            return await this.ventadetalleRepository.save(editedItem);

        } catch (error) {
            return error;
        }
    }
}
