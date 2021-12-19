import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from './auth-local.guard';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {

  constructor (private readonly authService: AuthService) {}
  
  @UseGuards(AuthLocalGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }
}