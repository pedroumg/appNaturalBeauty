import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto,EditArticuloDto} from './DTO';

@ApiTags('Api Articulos')
@Auth()
@Controller('api/v1/articulos')
export class ArticuloController {
    constructor(private readonly articuloService:ArticuloService){}
    @Get()
   async getAllItems(){
        return await this.articuloService.getAllItems()
    }
    @Post()
    async createItem(@Body() dto:CreateArticuloDto){
        return await this.articuloService.postItem(dto)
    }
    @Put(':idarticulo')
    async updateItem(@Param('idarticulo',ParseIntPipe) idarticulo:number,@Body() dto:EditArticuloDto):Promise<EditArticuloDto>{
        return await this.articuloService.putItem(idarticulo,dto);
    }
    @Put('updatestock/:idventa')
    async updateStock(@Param('idventa',ParseIntPipe) idventa:number){
        return await this.articuloService.updateStock(idventa)
    }
}
