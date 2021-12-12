import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {

  constructor (
    private readonly usuariosService: UsuariosService
  ) {}
  
  async autenticarUsuario (email: string, inputSenha: string) : Promise<any> {
    const usuario = await this.usuariosService.buscarPeloEmail(email);

    if (!usuario) {
      return null;
    }
    
    const senhaValida = inputSenha == usuario.senha;
    
    if (!senhaValida) {
      return null;
    }

    const { senha, ...resto } = usuario;
    return resto;
  } 
}
