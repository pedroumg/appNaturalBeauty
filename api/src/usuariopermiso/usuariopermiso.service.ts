import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioPermisoDto, EditUsuarioPermisosDto } from './DTO';
import { UsuarioPermisoEntity } from './Entity';

@Injectable()
export class UsuariopermisoService {
    constructor(@InjectRepository(UsuarioPermisoEntity) public readonly usuarioRepository:Repository<UsuarioPermisoEntity>){}
    //Obtener todos los registros 
    async getAllItems(){
        const data = await this.usuarioRepository.find();
        if(!data[0])throw new NotFoundException('No se encontraron registros')
        return data; 
    }
    //Crear un nuevo registro
    async postItem(dto:CreateUsuarioPermisoDto){
        try {
            const data = this.usuarioRepository.create(dto)
            return await this.usuarioRepository.save(data)
        } catch (error) {
            return error
        }
    }
    //Actualizar un registro por id
    async putItem(id:number,dto:EditUsuarioPermisosDto){
        try {
            const data = await this.usuarioRepository.findOne(id)
            if(!data)throw new NotFoundException()
            const editedItem = Object.assign(data,dto);
            return await this.usuarioRepository.save(editedItem)
        } catch (error) {
            return error
        }
    }
}
