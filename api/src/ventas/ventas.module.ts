import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasEntity } from './Entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { VentaDetalleEntity } from '../ventadetalle/Entity/ventadetalle.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VentasEntity,VentaDetalleEntity])],
  providers: [VentasService],
  controllers: [VentasController]
})
export class VentasModule {}
