import { Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreatePersonaDto,EditPersonaDto } from './DTO';
import { PersonaService } from './persona.service';

@ApiTags('Api Persona')
@Auth()
@Controller('api/v1/personas')
export class PersonaController {
    constructor(private readonly personaService: PersonaService){}
    @Get()
    async getAllItems(){
        return await this.personaService.getAllItems();
    }

    @Post()
    async createItem(@Body() dto:CreatePersonaDto){
        return await this.personaService.postItem(dto);
    }

    @Put(':id')
    async updateItem(@Param('id',ParseIntPipe) id:number, @Body() dto:EditPersonaDto){
        return await this.personaService.puttItem(id,dto);
    }
}
