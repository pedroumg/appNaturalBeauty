import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditosEntity } from './Entity/creditos.entity';

@Module({
    imports:[TypeOrmModule.forFeature([CreditosEntity])]
})
export class CreditosModule {}
