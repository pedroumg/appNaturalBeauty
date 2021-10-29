import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCategoriaDto, EditCategoriaDto } from './DTO';
import { CategoriaEntity } from './Entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(CategoriaEntity) private readonly categoriaRepository:Repository<CategoriaEntity>,
        private connection : Connection
        ){}

    async getAllItems(){
        const data = await this.categoriaRepository.find()
        if(!data[0])throw new NotFoundException('No se encontraron registros')
        return data;
        
    }
    async posttItem(dto:CreateCategoriaDto){

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const data = this.categoriaRepository.create(dto)
            const respuesta = await queryRunner.manager.save(data)
            await queryRunner.commitTransaction();
            return respuesta
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return error;
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
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
