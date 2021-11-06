import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Array<Jogador> = [];

  public async criarAtualizarJogador (criarJogadorDto: CriarJogadorDto) : Promise<void> {

    const jogadorSalvo = this.jogadores.find(jogador => jogador.email === criarJogadorDto.email);

    if (jogadorSalvo) {
      return this.atualizar(jogadorSalvo, criarJogadorDto);
    } else {
      return this.criar(criarJogadorDto);
    }
  }
  
  public async criar ({ nome, email, telefoneCelular }: CriarJogadorDto) : Promise<void> {

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

  public async consultarJogadores() : Promise<Jogador[]> {
    return this.jogadores; 
  }

  public async consultarJogadorPeloEmail (email: string) : Promise<Jogador> {
    const jogador = this.jogadores.find(jogador => jogador.email === email);

    if (!jogador) throw new NotFoundException(`Nenhum jogador com o email ${email} foi encontrado`);

    return jogador;
  }

  public atualizar (jogadorSalvo: Jogador, criarJogadorDto: CriarJogadorDto) : void {
    jogadorSalvo.nome = criarJogadorDto.nome;
  }

  async deletarJogador (email: string) : Promise<void> {
    const jogadorSalvo = this.jogadores.find(jogador => jogador.email === email);

    if (jogadorSalvo) {
      this.jogadores = this.jogadores.filter(jogador => jogador.email !== email);
    }
  }
}
