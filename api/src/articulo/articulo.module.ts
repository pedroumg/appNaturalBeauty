import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { ArticuloController } from './articulo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticuloEntity } from './Entity';

@Module({
  imports:[TypeOrmModule.forFeature([ArticuloEntity])],
  providers: [ArticuloService],
  controllers: [ArticuloController]
})
export class ArticuloModule {}
