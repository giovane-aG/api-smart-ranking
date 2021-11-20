import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { DesafioStatus } from "../interfaces/desafio-status.enum";

export class DesafioStatusValidacaoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const status = value.status
    
    if(status && !this.statusValido(status)) {
      throw new BadRequestException(`O status ${status} não é válido`);
    }

    return value;
  }

  private statusValido(status) {
    const statusValidos = [
      DesafioStatus.ACEITO,
      DesafioStatus.CANCELADO,
      DesafioStatus.NEGADO,
    ];

    return statusValidos.includes(status);
  }
}