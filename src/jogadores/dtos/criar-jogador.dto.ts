import { IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {

  @IsPhoneNumber()
  readonly telefoneCelular: string;
  
  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  readonly nome: string;
}
