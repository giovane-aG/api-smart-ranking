import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './interfaces/pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor (private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    return this.jogadoresService.criarJogador({ nome, email, telefoneCelular});
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador (
    @Body() criarJogadorDto: CriarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string) : Promise<void> {

    return this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores () : Promise<Jogador[]> {
    return this.jogadoresService.consultarJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId (
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string) : Promise<Jogador> {

      return this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/_id')
  async deletarJogador (@Param('_id', JogadoresValidacaoParametrosPipe) _id: string) : Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
