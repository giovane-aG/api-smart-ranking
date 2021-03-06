import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidasModule } from 'src/partidas/partidas.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interfaces/desafio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema  }]),
    CategoriasModule,
    JogadoresModule,
    forwardRef(() => PartidasModule)
  ],
  exports: [DesafiosService],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
