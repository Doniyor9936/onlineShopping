import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post("/createProduct")
  async createProduct(@Body() dto: CreateProductDto): Promise<{ message: string, product: Product }> {
    return this.productService.createProduct(dto)
  }
  @Get("/getOneProduct/:id")
  async getOneProduct(@Param('id') id: string): Promise<{ message: string, product: Product }> {
    return this.productService.getOneProduct(id)
  }
  @Get("/allProduct")
  async getAllProduct(): Promise<{ message: string, product: Product[] }> {
    return this.productService.getAllProduct()
  }
  @Put("/editProduct/:id")
  async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto): Promise<{ message: string, product: Product }> {
    return this.productService.updateProduct(id, dto)
  }
  @Delete("/delete/:id")
  async deleteProduct(@Param("id") id: string): Promise<{ message: string }> {
    return this.productService.deleteProduct(id)
  }
}
