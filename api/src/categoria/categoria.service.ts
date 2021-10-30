import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto, EditCategoriaDto } from './DTO';
import { CategoriaEntity } from './Entity';

@Injectable()
export class CategoriaService {
    constructor(@InjectRepository(CategoriaEntity) private readonly categoriaRepository:Repository<CategoriaEntity>){}

    async getAllItems(){
        const data = await this.categoriaRepository.find()
        if(!data[0])throw new NotFoundException('No se encontraron registros')
        return data;
        
    }
    async posttItem(dto:CreateCategoriaDto){
        try {
            const data = this.categoriaRepository.create(dto)
            return await this.categoriaRepository.save(data)
        } catch (error) {
            return error;
        }
    }
    async putItem(idcategoria:number,dto:EditCategoriaDto){
        try {
            const data = await this.categoriaRepository.findOne(idcategoria)
            if(!data) throw new NotFoundException({message:'La categoria no existe'})
            const editedItem = Object.assign(data,dto)
            return await this.categoriaRepository.save(editedItem)
        } catch (error) {
            return error
        }
    }
}
