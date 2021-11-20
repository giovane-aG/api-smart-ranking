import { IsDateString, IsNotEmptyObject, IsNotIn, IsOptional, IsString } from "class-validator";
import { DesafioStatus } from "../interfaces/desafio-status.enum";


export class AtualizarDesafioDTO {
  
  @IsOptional()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatus
}