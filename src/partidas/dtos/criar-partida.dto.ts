import { ArrayMaxSize, arrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Desafio } from "src/desafios/interfaces/desafios.interface";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";


export class criarPartidaDTO {

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  jogadores: Array<Jogador>;

  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  desafio: Desafio;

}