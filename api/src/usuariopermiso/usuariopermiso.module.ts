import { Module } from '@nestjs/common';
import { UsuariopermisoService } from './usuariopermiso.service';
import { UsuariopermisoController } from './usuariopermiso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPermisoEntity } from './Entity';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioPermisoEntity])],
  providers: [UsuariopermisoService],
  controllers: [UsuariopermisoController]
})
export class UsuariopermisoModule {}
