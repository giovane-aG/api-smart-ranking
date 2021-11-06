import { Injectable, Logger } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Array<Jogador> = [];

  async criarAtualizarJogador (criarJogadorDto: CriarJogadorDto) : Promise<void> {

    const jogadorSalvo = this.jogadores.find(jogador => jogador.email === criarJogadorDto.email);

    if (jogadorSalvo) {
      return this.atualizar(jogadorSalvo, criarJogadorDto);
    } else {
      return await this.criar(criarJogadorDto);
    }
  }
  
  async criar ({ nome, email, telefoneCelular }: CriarJogadorDto) : Promise<void> {

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      fotoJogadaor: 'www.google.com.br/foto123.jpg'
    }
    
    this.jogadores.unshift(jogador);
    this.logger.log(`Cria um jogador ->`, jogador);
    
  }

  async consultarJogadores() : Promise<Jogador[]> {
    return await this.jogadores; 
  }

  private atualizar(jogadorSalvo: Jogador, criarJogadorDto: CriarJogadorDto) : void {
    jogadorSalvo.nome = criarJogadorDto.nome;
  }
}
