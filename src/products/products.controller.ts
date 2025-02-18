import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto, ProductPostDto } from './dto';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  post(@Body() dto: ProductPostDto) {
    const pd = new Product();
    pd.Name = dto.Name;
    pd.Description = dto.Description;
    pd.Category = dto.Category;
    return this.productsService.CreateOrUpdate(pd);
  }

  @Put()
  put(@Body() dto: ProductDto) {
    const pd = new Product();
    pd.id = dto.id;
    pd.Name = dto.Name;
    pd.Description = dto.Description;
    pd.Category = dto.Category;
    return this.productsService.CreateOrUpdate(pd);
  }

  @Get()
  getall() {
    return this.productsService.All();
  }

  @Delete()
  delete(@Body() id: { id: number }) {
    return this.productsService.Delete(id.id);
  }
}
