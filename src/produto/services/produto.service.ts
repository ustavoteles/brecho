import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByPreco(preco: number): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        preco: LessThanOrEqual(preco),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async createProduto(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async updateProduto(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async deleteProduto(id: number): Promise<DeleteResult> {
    const produto = await this.findById(id);

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.delete(id);
  }
}
