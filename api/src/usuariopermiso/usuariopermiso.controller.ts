import { Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreateUsuarioPermisoDto, EditUsuarioPermisosDto } from './DTO';
import { UsuariopermisoService } from './usuariopermiso.service';

@ApiTags('Api Usuario Permisos')
@Auth()
@Controller('api/v1/usuariopermisos')
export class UsuariopermisoController {
    
    constructor(private readonly usuarioPermisos:UsuariopermisoService){}
    @Get()
    async getAllItems(){
        return await this.usuarioPermisos.getAllItems();
    }
    @Post()
    async createItem(@Body() dto:CreateUsuarioPermisoDto){
        return await this.usuarioPermisos.postItem(dto)
    }
    @Put(':id')
    async updateItem(@Param('id',ParseIntPipe) id:number,@Body() dto:EditUsuarioPermisosDto){
        return await this.usuarioPermisos.putItem(id,dto)
    }
}
