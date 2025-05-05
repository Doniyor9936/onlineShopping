import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create.product.dto";
import { Category } from "src/category/category.entity";
import { UpdateProductDto } from "./dto/update.product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async createProduct(
    dto: CreateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException("category not found");
    }
    const product = this.productRepository.create({
      ...dto,
      category: category,
    });
    await this.productRepository.save(product);
    return { message: "succesfully product create", product: product };
  }
  async getOneProduct(
    id: string,
  ): Promise<{ message: string; product: Product }> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException("product not found");
      }
      return { message: "product", product: product };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
  async getAllProduct(): Promise<{ message: string; product: Product[] }> {
    try {
      const products = await this.productRepository.find();
      if (!products) {
        throw new NotFoundException("product not found");
      }
      return { message: "all products", product: products };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
  async updateProduct(
    id: string,
    dto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    try {
      const existsProduct = await this.productRepository.findOne({
        where: { id },
      });
      if (!existsProduct) {
        throw new NotFoundException("product not found");
      }
      await this.productRepository.update(id, dto);
      const editProduct = await this.productRepository.findOne({
        where: { id },
      });
      if (!editProduct) {
        throw new InternalServerErrorException("update product not found");
      }
      return { message: "succes edit", product: editProduct };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteProduct(id: string): Promise<{ message: string }> {
    try {
      const existsProduct = await this.productRepository.findOne({
        where: { id },
      });
      if (!existsProduct) {
        throw new NotFoundException("product not found");
      }
      await this.productRepository.delete(existsProduct);
      return { message: "succesfully deleted product" };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
}
