import { Document } from "mongoose";
import { Desafio } from "src/desafios/interfaces/desafios.interface";
import { Resultado } from "src/desafios/interfaces/resultado.interface";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";


export interface Partida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<Resultado>;
  desafio: Desafio
}