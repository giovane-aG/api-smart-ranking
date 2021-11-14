import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

@Module({
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
