import { BadRequestException, Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { Desafio } from './interfaces/desafios.interface';

@Injectable()
export class DesafiosService {
  
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly categoriasService: CategoriasService,
    private readonly jogadoresService: JogadoresService
  ) {}

  async consultarDesafios () : Promise<Array<Desafio>> {
    return await this.desafioModel.find();
  }

  async consultarDesafioPeloId (_id: string) : Promise<Desafio> {
    const desafioEncontrado = await this.desafioModel.findOne({ _id });

    if (!desafioEncontrado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${_id} foi encontrado`);
    }

    return desafioEncontrado;
  }

  async criarDesafio (criarDesafioDTO: CriarDesafioDTO) : Promise<Desafio> {
    const { solicitante, dataHoraDesafio, jogadores } = criarDesafioDTO;

    const solicitanteEncontrado = await this.jogadoresService.consultarJogadorPeloId(solicitante);

    const solicitanteEUmDosJogadores = jogadores.find(jogador => jogador == solicitanteEncontrado._id);
    if (!solicitanteEUmDosJogadores) {
      throw new BadRequestException(`O solicitante do desafio deve ser um dos dois jogadores que irão participar do jogo`);
    }

    const desafiado = jogadores.find(jogador => jogador !== solicitante);
    if (!desafiado) {
      throw new BadRequestException(`É necessário inserir dois jogadores diferentes`);
    }

    // validar se o solicitante está inserido em alguma categoria

    const categorias = await this.categoriasService.consultarCategorias();

    let solicitantePertenceAAlgumaCategoria = false;
    let desafiadoPertenceAAlgumaCategoria = false;
    let categoriaSolicitante;

    categorias.forEach(categoria => {
      const { jogadores } = categoria;

      if (jogadores.includes(solicitante)) { // continuar
        solicitantePertenceAAlgumaCategoria = true;
        categoriaSolicitante = categoria.categoria;
      }

      if (jogadores.find(jogador => jogador == desafiado)) {
        desafiadoPertenceAAlgumaCategoria = true;
      }
    });

    if (!solicitantePertenceAAlgumaCategoria) {
      throw new BadRequestException(`O solicitante ${solicitante} não pertence a nenhuma categoria`);
    }
    if (!desafiadoPertenceAAlgumaCategoria) {
      throw new BadRequestException(`O desafiado ${desafiado} não pertence a nenhuma categoria`);
    }

    const novoDesafio = new this.desafioModel({
      categoria: categoriaSolicitante,
      dataHoraDesafio: criarDesafioDTO.dataHoraDesafio,
      dataHoraSolicitacao: new Date().toISOString(),
      status: DesafioStatus.PENDENTE,
      solicitante,
      jogadores
    });
    
    return await this.desafioModel.create(novoDesafio);
  }
}
