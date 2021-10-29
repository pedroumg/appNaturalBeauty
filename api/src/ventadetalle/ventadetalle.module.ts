import { Module } from '@nestjs/common';
import { VentadetalleService } from './ventadetalle.service';
import { VentadetalleController } from './ventadetalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaDetalleEntity } from './Entity';

@Module({
  imports:[TypeOrmModule.forFeature([VentaDetalleEntity])],
  providers: [VentadetalleService],
  controllers: [VentadetalleController]
})
export class VentadetalleModule {}
