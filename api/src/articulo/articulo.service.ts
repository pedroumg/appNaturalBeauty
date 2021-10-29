import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticuloDto,EditArticuloDto} from './DTO';
import { ArticuloEntity } from './Entity';

@Injectable()
export class ArticuloService {
    constructor(@InjectRepository(ArticuloEntity) private readonly articuloRepository:Repository<ArticuloEntity>){}

   async getAllItems(){
       try {
       const data = await this.articuloRepository.createQueryBuilder('articulo')
        .leftJoinAndSelect("articulo.idcategoria", "categoria")
        .getMany();
        //.where("articulo.estado = :id", { id: 'Activo' })
        if(!data[0])throw new NotFoundException('No se encontraron registros')
        return data 
       } catch (error) {
            return error;
           
       }
   }
   async postItem(dto:CreateArticuloDto){
       try {
           const data = await this.articuloRepository.create(dto)
           return await this.articuloRepository.save(data)
       } catch (error) {
           return error;
       }
   }
   async putItem(idarticulo:number,dto:EditArticuloDto){
       const data = await this.articuloRepository.findOne(idarticulo)
       if(!data)throw new NotFoundException()
       const editedItem = Object.assign(data,dto)
       return await this.articuloRepository.save(editedItem)
   }
   async updateStock(idventa:number){
       const data = await this.articuloRepository.query(`CALL spUpdateStock(${idventa})`)
       return data;
   }
}
