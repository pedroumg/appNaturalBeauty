import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto, EditCategoriaDto } from './DTO';

@ApiTags('Api Categoria')
@Auth()
@Controller('api/v1/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService:CategoriaService){}
    @Get()
    async getAllItems(){
        return await this.categoriaService.getAllItems();
    }
    @Post()
    async postItem(@Body() dto:CreateCategoriaDto){
        return await this.categoriaService.posttItem(dto)
    }
    @Put(':idcategoria')
    async putItem(@Param('idcategoria',ParseIntPipe) idcategoria:number,@Body() dto:EditCategoriaDto):Promise<EditCategoriaDto>{
        return await this.categoriaService.putItem(idcategoria,dto)
    }
}
