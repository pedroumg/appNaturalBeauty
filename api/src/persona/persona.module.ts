import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from './Entity';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

@Module({
  imports:[TypeOrmModule.forFeature([PersonaEntity])],
  providers: [PersonaService],
  controllers: [PersonaController]
})
export class PersonaModule {}
