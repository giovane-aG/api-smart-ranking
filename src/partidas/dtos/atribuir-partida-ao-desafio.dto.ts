import { IsNotEmpty } from 'class-validator';
import { Resultado } from 'src/desafios/interfaces/resultado.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class AtribuirDesafioPartidaDTO {

  @IsNotEmpty()
  def: Jogador

  @IsNotEmpty()
  resultado: Array<Resultado>
  
}