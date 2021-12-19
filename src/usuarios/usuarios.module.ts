import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './interfaces/usuario.schema';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuarios', schema: UsuarioSchema  }])],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}

