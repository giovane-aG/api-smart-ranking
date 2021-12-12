import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usuarioSchema } from './interfaces/usuario.schema';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Usuario', schema: usuarioSchema }])],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}

