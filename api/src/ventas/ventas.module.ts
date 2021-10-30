import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasEntity } from './Entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';

@Module({
  imports:[TypeOrmModule.forFeature([VentasEntity])],
  providers: [VentasService],
  controllers: [VentasController]
})
export class VentasModule {}
