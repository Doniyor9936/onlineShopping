import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create.category.dto";
import { Category } from "./category.entity";
import { UpdateCategoryDto } from "./dto/update.category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post("/createCategory")
  async createCategory(@Body() dto: CreateCategoryDto): Promise<{ message: string; category: Category }> {
    return this.categoryService.createCategory(dto);
  }
  @Get("/getOneCategory/:id")
  async getOneCategory(@Param("id") id: string): Promise<{ message: string; category: Category }> {
    return this.categoryService.getOneCategory(id);
  }
  @Put("/edit/:id")
  async updateCategory(@Param("id") id: string, @Body() dto: UpdateCategoryDto): Promise<{ message: string; category: Category }> {
    return this.categoryService.updateCategory(id, dto);
  }
  @Delete("/delete/:id")
  async deleteCategory(@Param("id") id: string): Promise<{ message: string }> {
    return this.categoryService.deleteCategory(id);
  }
}
