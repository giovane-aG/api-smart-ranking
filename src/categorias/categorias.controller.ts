import { Body, Controller, Get, Inject, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto'; 
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

  constructor (private readonly categoriaService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria (@Body() criarCategoriaDTO: CriarCategoriaDTO) : Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDTO);
  }

  @Get()
  async consultarCategorias () : Promise<Array<Categoria>> {
    return await this.categoriaService.consultarCategorias();
  }

  @Get('/:categoria')
  async consultadCategoria (@Param('categoria') categoria: string) : Promise<Categoria> {
    return await this.categoriaService.consultarCategoria(categoria);
  }

  @Put('/:categoria')
  async atualizarCategoria (
    @Param('categoria') categoria: string,
    @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO) : Promise<void> {
      return await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDTO);
    }
  
  @Post('/:categoria/jogadores/:jogador_id')
  async adicionarJogadorNaCategoria(
    @Param() params: any,
    ) : Promise<void> {
      const { categoria, jogador_id } = params;
      return await this.categoriaService.adicionarJogadorNaCategoria(categoria, jogador_id);
    }

}
