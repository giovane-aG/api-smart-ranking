import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

  constructor (
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  public async consultarJogadores() : Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadorPeloId (_id: string) : Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({_id});

    if (!jogador) throw new NotFoundException(`Nenhum jogador com o _id ${_id} foi encontrado`);

    return jogador;
  }

  public async criarJogador (criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorSalvo = await this.jogadorModel.findOne({email}).exec();

    if (jogadorSalvo) throw new ConflictException('O email escolhido já está sendo utilizado');

    const novoJogador = new this.jogadorModel(criarJogadorDto);
    return await this.jogadorModel.create(novoJogador);
  }
  
  public async atualizarJogador (_id: string, atualizarJogadorDto: AtualizarJogadorDto) : Promise<void> {
    const jogador = await this.jogadorModel.findOne({ _id });

    if (!jogador) throw new NotFoundException(`Nenhum jogador com o _id ${_id} foi encontrado`);
    
    await this.jogadorModel.findOneAndUpdate({
        _id: _id
      },{ 
        $set: atualizarJogadorDto
    }).exec();
  }

  async deletarJogador (_id: string) : Promise<void> {
    const jogador = await this.jogadorModel.findOne({ _id });
    if (!jogador) throw new NotFoundException(`Nenhum jogador com o _id ${_id} foi encontrado`);

    await this.jogadorModel.findOneAndDelete({_id});
  }
}
