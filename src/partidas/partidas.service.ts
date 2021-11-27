import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { DesafiosService } from 'src/desafios/desafios.service';
import { Partida } from './interfaces/partida.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { criarPartidaDTO } from './dtos/criar-partida.dto';

@Injectable()
export class PartidasService {

  constructor (
    @InjectModel('Partida') private readonly partidaModel : Model<Partida>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
    private readonly desafiosService: DesafiosService
  ) {}

  async criarPartida (criarPartidaDTO: criarPartidaDTO) : Promise<Partida> {
    const jogadores = await this.jogadoresService.consultarJogadores();

    criarPartidaDTO.jogadores.forEach(jogador => {
      const jogadorEncontrado = jogadores.find(j => j._id == jogador._id);

      if (!jogadorEncontrado) {
        throw new NotFoundException(`Nenhum jogador com o _id ${jogador._id} foi encontrado`);
      }
    });

    const categoria = await this.categoriasService.consultarCategoria(criarPartidaDTO.categoria);

    if (!categoria) {
      throw new NotFoundException(`A categoria ${criarPartidaDTO.categoria} não está cadastrada`);
    }

    const desafios = await this.desafiosService.consultarDesafios();
    const desafioEncontrado = desafios.find(desafio => desafio._id == criarPartidaDTO.desafio._id);

    if (!desafioEncontrado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${criarPartidaDTO.desafio._id} foi encontrado`);
    }

    const partida = new this.partidaModel({
      jogadores: criarPartidaDTO.jogadores,
      def: criarPartidaDTO.def,
      categoria: criarPartidaDTO.categoria,
      desafio: criarPartidaDTO.desafio
    });

    return await this.partidaModel.create(partida);
  } 
}
