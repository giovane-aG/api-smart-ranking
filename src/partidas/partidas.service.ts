import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { DesafiosService } from 'src/desafios/desafios.service';
import { Partida } from './interfaces/partida.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarPartidaDTO } from './dtos/criar-partida.dto';
import { AtualizarResultadoDTO } from './dtos/atualizar-resultado.dto';

@Injectable()
export class PartidasService {

  constructor (
    @InjectModel('Partida') private readonly partidaModel : Model<Partida>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
    private readonly desafiosService: DesafiosService
  ) {}

  async criarPartida (criarPartidaDTO: CriarPartidaDTO) : Promise<Partida> {
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
      categoria: criarPartidaDTO.categoria,
      desafio: criarPartidaDTO.desafio
    });

    return await this.partidaModel.create(partida);
  }
  
  async consultarPartidas () : Promise<Array<Partida>> {
    return await this.partidaModel.find().populate('desafio');
  }

  async atualizarResultado (partida: string, atualizarResultadoDTO: AtualizarResultadoDTO) : Promise<void> {
    const partidaSelecionada = await this.partidaModel.findOne({ _id: partida });
    
    if (!partidaSelecionada) {
      throw new NotFoundException(`Nenhuma partida com o _id ${partida} foi encontrada`);
    }

    const { def, resultado } = atualizarResultadoDTO;
    
    const vencedor = partidaSelecionada.jogadores.find(jogador => jogador._id == def._id);

    if (!vencedor) {
      throw new BadRequestException("O vencedor informado não faz parte do desafio");
    }

    await this.partidaModel.findOneAndUpdate({ _id: partida }, {
      $set: {
        resultado,
        def
      }
    });
  }
}
