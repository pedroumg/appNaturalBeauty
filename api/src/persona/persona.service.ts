import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto, EditPersonaDto } from './DTO';
import { PersonaEntity } from './Entity';

@Injectable()
export class PersonaService {
    constructor(@InjectRepository(PersonaEntity) private readonly personaRepository:Repository<PersonaEntity> ){}

    async getAllItems(){
        const data = await this.personaRepository.find()
        if(!data[0])throw new NotFoundException('No se encontraron registros')
        return data;
    }
    async postItem(dto:CreatePersonaDto){
        try {
            const data = this.personaRepository.create(dto)
            return await this.personaRepository.save(dto)
        } catch (error) {
            return error
        }
    }
    async puttItem(id:number,dto:EditPersonaDto){
        try {
            const data = await this.personaRepository.findOne(id)
            if(!data)throw new NotFoundException('Registro no Encontrado')
            const editedItem = Object.assign(data,dto)
            return await this.personaRepository.save(editedItem)
        } catch (error) {
            return error
        }
    }
}
