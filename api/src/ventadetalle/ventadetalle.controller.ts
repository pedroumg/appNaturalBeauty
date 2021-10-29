import { Body, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { EditVentasDto } from 'src/ventas/DTO';
import { CreateVentaDetalleDto } from './DTO';
import { VentadetalleService } from './ventadetalle.service';

@ApiTags('Api Detalle Ventas')
@Auth()
@Controller('api/v1/ventadetalles')
export class VentadetalleController {
    constructor(public readonly ventadetalleService:VentadetalleService){}
    @Get()
    async getAllItems(){
        return await this.ventadetalleService.getAllItems();
    }
    @Post()
    async createItem(@Body() dto:CreateVentaDetalleDto){
        return await this.ventadetalleService.postItem(dto)
    }
    @Put(':id')
    async updateItem(@Param('id' ,ParseIntPipe) id:number,@Body() dto:EditVentasDto){
        return await this.ventadetalleService.putItem(id,dto);
    }
}
