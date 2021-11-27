import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { Document } from "mongoose";
import { Resultado } from "src/desafios/interfaces/resultado.interface";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";


export class AtualizarResultadoDTO extends Document {
  
  @IsNotEmpty()
  def: Jogador;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  resultado: Array<Resultado>;
}