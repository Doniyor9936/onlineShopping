import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create.category.dto";
import { UpdateCategoryDto } from "./dto/update.category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    dto: CreateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    try {
      const existsCategory = await this.categoryRepository.findOne({
        where: { categoryName: dto.categoryName },
      });

      if (existsCategory) {
        throw new ConflictException("category already exists");
      }
      const createCategory = await this.categoryRepository.create(dto);
      await this.categoryRepository.save(createCategory);
      return {
        message: "create succesfully category",
        category: createCategory,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getOneCategory(
    id: string,
  ): Promise<{ message: string; category: Category }> {
    try {
      const existsCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existsCategory) {
        throw new NotFoundException("category not found");
      }
      return { message: "one category", category: existsCategory };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<{ message: string; category: Category }> {
    try {
      const existsCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existsCategory) {
        throw new NotFoundException("category not found");
      }
      await this.categoryRepository.update(id, dto);
      const edit = await this.categoryRepository.findOne({ where: { id } });
      if (!edit) {
        throw new NotFoundException("category not found");
      }
      return { message: "edit category", category: edit };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteCategory(id: string): Promise<{ message: string }> {
    try {
      const existsCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existsCategory) {
        throw new NotFoundException("category not found");
      }
      await this.categoryRepository.remove(existsCategory);
      return { message: "succes delete category" };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
}
