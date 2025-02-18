import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  CreateOrUpdate(pd: Product) {
    this.productsRepository.save(pd);
    return {
      message: ['Successfully save the product'],
      statusCode: 200,
    };
  }

  async Find(id: number) {
    return {
      message: ['Successfully find the product'],
      products: await this.productsRepository.findOneBy({ id: id }),
      statusCode: 200,
    };
  }

  async All() {
    return {
      message: ['Successfully delete the product'],
      products: await this.productsRepository.find(),
      statusCode: 200,
    };
  }
  async Delete(id: number) {
    const pd = await this.productsRepository.findOneBy({ id: id });
    if (pd) {
      this.productsRepository.remove(pd);
      return {
        message: ['Successfully delete the product'],
        statusCode: 200,
      };
    }

    return {
      message: ['Can not find the product'],
      error: 'Bad Request',
      statusCode: 400,
    };
  }
}
