import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafios.interface';

@Injectable()
export class DesafiosService {
  
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>
  ) {}

  async consultarDesafios () : Promise<Array<Desafio>> {
    return await this.desafioModel.find();
  }

  async consultarDesafioPeloId (_id: string) : Promise<Desafio> {
    const desafioEncontrado = await this.desafioModel.findOne({ _id });

    if (!desafioEncontrado) {
      throw new NotFoundException(`Nenhum desafio com o _id ${_id} foi encontrado`);
    }

    return desafioEncontrado;
  }
}
