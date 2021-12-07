import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://giovane:giovane27@cluster0.mpxxd.mongodb.net/apismartranking?retryWrites=true&w=majority&authSource=admin&readPreference=primary`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    PartidasModule,
    AuthModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'api/v1/partidas',
        'api/v1/jogadores',
        'api/v1/desafios',
        'api/v1/categorias'
      );
  }
}
