import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly authService : AuthService;

  constructor(authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha'
    });
    this.authService = authService;
  }

  async validate (email: string, senha: string) : Promise<any> {
    const usuario = await this.authService.autenticarUsuario(email, senha);
    if (!usuario)  {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}