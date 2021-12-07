import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from 'src/usuarios/interfaces/usuario.interface';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate (email: string, senha: string) : Promise<Usuario> {
    const usuario = await this.authService.autenticarUsuario(email, senha);

    if (!usuario)  {
      throw new UnauthorizedException();
    }

    return usuario;
  }


}