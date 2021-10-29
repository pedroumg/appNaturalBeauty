import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './Entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriaEntity])],
  providers: [CategoriaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}