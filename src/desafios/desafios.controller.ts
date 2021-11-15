import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafios.interface';

@Controller('api/v1/desafios')
export class DesafiosController {

  constructor (private readonly desafiosService: DesafiosService) {}
  
  @Get()
  async consultarDesafios () : Promise<Array<Desafio>> {
    return await this.desafiosService.consultarDesafios();
  }

  @Get('/:_id')
  async consultarDesafioDeUmjogador (@Param('_id') _id: string) : Promise<Array<Desafio>> {
    return await this.desafiosService.consultarDesafiosDeUmjogador(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio (@Body() criarDesafioDTO: CriarDesafioDTO) : Promise<Desafio> {
    return await this.desafiosService.criarDesafio(criarDesafioDTO);
  }
  
}
