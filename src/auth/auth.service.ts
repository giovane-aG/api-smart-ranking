import { BadRequestException, Dependencies, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { compare } from 'bcrypt';

@Injectable()
@Dependencies(UsuariosService)
export class AuthService {

  constructor (
    private readonly usuariosService: UsuariosService
  ) {}
  
  async autenticarUsuario (email: string, inputSenha: string) : Promise<any> {
    const usuario = await this.usuariosService.buscarPeloEmail(email);

    if (!usuario) {
      return null;
    }
    
    const senhaValida = await compare(inputSenha, usuario.senha);
    
    if (!senhaValida) {
      return null;
    }

    const { senha, ...resto } = usuario;
    return resto;
  } 
}
