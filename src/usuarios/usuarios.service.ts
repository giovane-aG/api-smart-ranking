import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './interfaces/usuario.interface';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>
  ) {}

  async buscarPeloEmail (email: string) : Promise<Usuario> {
    const usuarioEncontrado = await this.usuarioModel.findOne({ email });
    if (!usuarioEncontrado) throw new NotFoundException("Usuario não encontrado");
    return usuarioEncontrado;
  }
}
