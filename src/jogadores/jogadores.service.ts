import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor (
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  public async criarAtualizarJogador (criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {

    const { email } = criarJogadorDto;
    const jogadorSalvo = await this.jogadorModel.findOne({email}).exec();

    if (jogadorSalvo) {
      return this.atualizar(criarJogadorDto);
    } else {
      return this.criar(criarJogadorDto);
    }
  }
  
  public async criar ({ nome, email, telefoneCelular }: CriarJogadorDto) : Promise<Jogador> {

    // const jogador = {
    //   nome,
    //   email,
    //   telefoneCelular,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   fotoJogadaor: 'www.google.com.br/foto123.jpg'
    // }

    const novoJogador = new this.jogadorModel({
      nome,
      email,
      telefoneCelular
    });

    return await this.jogadorModel.create(novoJogador);

  }

  public async consultarJogadores() : Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadorPeloEmail (email: string) : Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ email });

    if (!jogador) throw new NotFoundException(`Nenhum jogador com o email ${email} foi encontrado`);

    return jogador;
  }

  public async atualizar (criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate({
        email: criarJogadorDto.email
      },{ 
        $set: criarJogadorDto
    }).exec();
  }

  async deletarJogador (email: string) : Promise<Jogador> {
    return await this.jogadorModel.findOneAndDelete({
      email
    });
  }
}
