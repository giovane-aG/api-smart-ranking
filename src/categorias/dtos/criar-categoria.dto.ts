import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { Evento } from "../interfaces/evento.interface";

export class CriarCategoriaDTO {
  
  @IsString()
  @IsNotEmpty()
  readonly categoria: string;
  
  @IsString()
  @IsNotEmpty()
  descricao: string;
  
  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}