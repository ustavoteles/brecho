import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNnome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Get('/preco/:preco')
  @HttpCode(HttpStatus.OK)
  findByPreco(@Param('preco') preco: number): Promise<Produto[]> {
    return this.produtoService.findByPreco(preco);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduto(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.createProduto(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateProduto(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.updateProduto(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduto(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.deleteProduto(id);
  }
}
