import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { Partida } from "./partida.interface";

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: string;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida
}