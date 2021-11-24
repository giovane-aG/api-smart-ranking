import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://giovane:giovane27@cluster0.mpxxd.mongodb.net/apismartranking?retryWrites=true&w=majority&authSource=admin&readPreference=primary`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    PartidasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
