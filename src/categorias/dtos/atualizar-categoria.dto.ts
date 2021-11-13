import { IsString, IsOptional } from "class-validator";
import { Evento } from '../interfaces/evento.interface';

export class AtualizarCategoriaDTO {
  @IsString()
  @IsOptional()
  descricao: string;

  eventos: Array<Evento>;
}