import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

  constructor (
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService
  ) {}

  async criarCategoria (criarCategoriaDTO: CriarCategoriaDTO) : Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;

    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    if (categoriaEncontrada) throw new ConflictException(`A categoria ${categoria} já foi cadastrada`);

    const novaCategoria = new this.categoriaModel(criarCategoriaDTO);

    return await this.categoriaModel.create(novaCategoria);
  }

  async consultarCategorias () : Promise<Array<Categoria>> {
    return await this.categoriaModel.find()//.populate('jogadores');
  }

  async consultarCategoria (categoria: string) : Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).populate('jogadores');

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

  async adicionarJogadorNaCategoria (categoria: string, jogador_id: string): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria });
    
    if (!categoriaEncontrada) {
      throw new NotFoundException(`A categoria ${categoria} não foi encontrada`);
    }

    await this.jogadoresService.consultarJogadorPeloId(jogador_id);

    const jogadorJaParticipaDaCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in([jogador_id]);
    console.log(jogadorJaParticipaDaCategoria);

    if (jogadorJaParticipaDaCategoria.length > 0) {
        throw new ConflictException(`Esse jogador já participa da categoria ${categoria}`);
    }
    
    // if (categoriaEncontrada.jogadores.includes(jogadorEncontrado._id)) {
    //   throw new ConflictException(`Esse jogador já participa da categoria ${categoria}`);
    // }

    categoriaEncontrada.jogadores.push(jogador_id);
    await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada });
  }
}
