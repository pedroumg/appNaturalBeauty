import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreateVentasDto, EditVentasDto } from './DTO';
import { VentasService } from './ventas.service';

@ApiTags('Api Ventas')
@Auth()
@Controller('api/v1/ventas')
export class VentasController {
    constructor(public readonly ventasService:VentasService){}
    @Get()
    async getAllItems(){
        return  await this.ventasService.getAllItems()
    }
    @Post()
    async createItem(@Body() dto:CreateVentasDto){
        return await this.ventasService.postItem(dto)
    }
    @Put(':id')
    async updateItem(@Param('id',ParseIntPipe) id:number,@Body() dto:EditVentasDto){
        return await this.ventasService.putItem(id,dto)
    }
    @Put('anular/:idventa')
    async anularFactura(@Param('idventa',ParseIntPipe) idventa:number){
        return await this.ventasService.spAnularFactura(idventa)
    }
}
