import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor (private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    return await this.jogadoresService.criarAtualizarJogador({ nome, email, telefoneCelular});
  }

  @Get()
  async consultarJogadores () : Promise<Jogador[]> {
    return await this.jogadoresService.consultarJogadores();
  }
}
