import { forwardRef, Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './interfaces/partida.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { DesafiosModule } from 'src/desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema }]),
    JogadoresModule,
    CategoriasModule,
    forwardRef(() => DesafiosModule)
  ],
  exports: [PartidasService],
  providers: [PartidasService],
  controllers: [PartidasController]
})
export class PartidasModule {}
