import { Body, Controller, Param, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Partida } from 'src/desafios/interfaces/partida.interface';
import { criarPartidaDTO } from './dtos/criar-partida.dto';
import { PartidasService } from './partidas.service';

@Controller('api/v1/partidas')
export class PartidasController {

  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarPartida (@Body() criarPartidaDTO: criarPartidaDTO) : Promise<Partida> {
    return this.partidasService.criarPartida(criarPartidaDTO);
  }

  @Get()
  async consultarPartidas () : Promise<Array<Partida>> {
    return await this.partidasService.consultarPartidas();
  }
}
