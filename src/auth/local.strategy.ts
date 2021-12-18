import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly authService : AuthService;
  private readonly jwtService  : JwtService;

  constructor(authService: AuthService, jwtService: JwtService) {
    super({
      usernameField: 'email',
      passwordField: 'senha'
    });
    this.authService = authService;
    this.jwtService = jwtService;
  }

  async validate (email: string, senha: string) : Promise<any> {
    const usuario = await this.authService.autenticarUsuario(email, senha);

    if (!usuario)  {
      throw new UnauthorizedException();
    }

    return usuario;
  }

  async login (user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  
}