import { BadRequestException, forwardRef, Get, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { PartidasService } from 'src/partidas/partidas.service';
import { AtualizarDesafioDTO } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { Desafio } from './interfaces/desafios.interface';

@Injectable()
export class DesafiosService {
  
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly categoriasService: CategoriasService,
    private readonly jogadoresService: JogadoresService,
    @Inject(forwardRef(() => PartidasService))
    private readonly partidasService: PartidasService
  ) {}

  async consultarDesafios () : Promise<Array<Desafio>> {
    return await this.desafioModel.find();
  }

  async consultarDesafiosDeUmjogador (_id: string) : Promise<Array<Desafio>> {
    return await this.desafioModel.find().where('jogadores').in([_id]);
  }

  async criarDesafio (criarDesafioDTO: CriarDesafioDTO) : Promise<Desafio> {
    const { solicitante, dataHoraDesafio, jogadores } = criarDesafioDTO;

    const solicitanteEncontrado = await this.jogadoresService.consultarJogadorPeloId(solicitante._id);

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

      if (jogadores.includes(solicitante._id)) {
        solicitantePertenceAAlgumaCategoria = true;
        categoriaSolicitante = categoria.categoria;
      }

      if (jogadores.includes(desafiado._id)) {
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
      dataHoraDesafio,
      dataHoraSolicitacao: new Date().toISOString(),
      status: DesafioStatus.PENDENTE,
      solicitante,
      jogadores
    });
    
    return await this.desafioModel.create(novoDesafio);
  }

  async atualizarDesafio (_id: string, atualizarDesafioDTO: AtualizarDesafioDTO) : Promise<void> {
    const desafioSelecionado = await this.desafioModel.findOne({ _id });

    if (!desafioSelecionado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${_id} foi encontrado`);
    }

    if (atualizarDesafioDTO.status) {
      desafioSelecionado.dataHoraResposta = new Date();
    }

    desafioSelecionado.status = atualizarDesafioDTO.status;
    desafioSelecionado.dataHoraDesafio = atualizarDesafioDTO.dataHoraDesafio;

    await this.desafioModel.findOneAndUpdate({ _id }, {
      $set: desafioSelecionado
    });
  }

  async deletarDesafio (_id: string) : Promise<void> {

    const desafioSelecionado = this.desafioModel.findOne({ _id });

    if (!desafioSelecionado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${_id} foi encontrado`);
    }

    await this.desafioModel.updateOne({ _id }, { status: DesafioStatus.CANCELADO });
  }

  async atribuirPartidaADesafio (desafio: string, partida: string) : Promise<void> {
    const desafioSelecionado = await this.desafioModel.findOne({ _id: desafio });

    if (!desafioSelecionado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${desafio} foi encontrado`);
    }

    const partidaSelecionada = await this.partidasService.consultarPartidaPeloId(partida);

    if (!partidaSelecionada) {
      throw new NotFoundException(`Nenhuma partida com o _id ${partida} foi encontrada`);
    }

    desafioSelecionado.partida = partidaSelecionada;

    await this.desafioModel.findOneAndUpdate({ _id: desafio }, {
      $set: desafioSelecionado
    });
  }
}
