import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor (private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    return await this.jogadoresService.criarJogador({ nome, email, telefoneCelular});
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador (
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string) : Promise<void> {

    return await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async consultarJogadores () : Promise<Jogador[]> {
    return this.jogadoresService.consultarJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId (
    @Param('_id', ValidacaoParametrosPipe) _id: string) : Promise<Jogador> {

      return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador (@Param('_id', ValidacaoParametrosPipe) _id: string) : Promise<void> {
    return await this.jogadoresService.deletarJogador(_id);
  }
}
