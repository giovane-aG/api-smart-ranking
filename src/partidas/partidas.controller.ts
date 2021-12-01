import { Body, Controller, Param, Post, Get, UsePipes, ValidationPipe, Put, Patch } from '@nestjs/common';
import { Partida } from 'src/desafios/interfaces/partida.interface';
import { AtualizarResultadoDTO } from './dtos/atualizar-resultado.dto';
import { CriarPartidaDTO } from './dtos/criar-partida.dto';
import { PartidasService } from './partidas.service';

@Controller('api/v1/partidas')
export class PartidasController {

  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarPartida (@Body() criarPartidaDTO: CriarPartidaDTO) : Promise<Partida> {
    return this.partidasService.criarPartida(criarPartidaDTO);
  }

  @Get()
  async consultarPartidas () : Promise<Array<Partida>> {
    return await this.partidasService.consultarPartidas();
  }

  @Get('/:partida')
  @UsePipes(ValidationPipe)
  async consultarPartidaPeloId (@Param('partida') partida: string) : Promise<Partida> {
    return await this.partidasService.consultarPartidaPeloId(partida);
  }
  
  @Patch('/:partida')
  async atualizarResultado (@Param('partida') partida, @Body() atualizarResultadoDTO: AtualizarResultadoDTO) : Promise<void> {
    return await this.partidasService.atualizarResultado(partida, atualizarResultadoDTO);
  }
}
