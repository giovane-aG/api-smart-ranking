import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor (private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    return this.jogadoresService.criarAtualizarJogador({ nome, email, telefoneCelular});
  }

  @Get()
  async consultarJogadores (
    @Query('email') email: string) : Promise<Jogador[] | Jogador | undefined> {

      if (email) {
        return this.jogadoresService.consultarJogadorPeloEmail(email);
      } else {
        return this.jogadoresService.consultarJogadores();
      }
  }

  @Delete()
  async deletarJogador (@Query('email') email: string) : Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
