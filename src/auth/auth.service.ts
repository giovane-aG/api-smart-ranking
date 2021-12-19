import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService
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

    return {
      email: usuario.email
    };
  }

  async login (user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

}
