import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

  constructor (
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
  ) {}

  async criarCategoria (criarCategoriaDTO: CriarCategoriaDTO) : Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;

    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    if (categoriaEncontrada) throw new ConflictException(`A categoria ${categoria} já foi cadastrada`);

    const novaCategoria = new this.categoriaModel(criarCategoriaDTO);

    return await this.categoriaModel.create(novaCategoria);
  }

  async consultarCategorias () : Promise<Array<Categoria>> {
    return await this.categoriaModel.find();
  }

  async consultarCategoria (categoria: string) : Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria});

    if (!categoriaEncontrada) throw new NotFoundException(`A categoria ${categoria} não foi encontrada`);

    return categoriaEncontrada;
  }

  async atualizarCategoria (categoria: string, atualizarCategoriaDTO: AtualizarCategoriaDTO) : Promise<void> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria});

    if (!categoriaEncontrada) throw new NotFoundException(`A categoria ${categoria} não foi encontrada`);

    await this.categoriaModel.findOneAndUpdate({
      categoria 
    }, {
        $set: atualizarCategoriaDTO
      }
    );
  }
}
