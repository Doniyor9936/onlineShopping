import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create.brand.dto";
import { Brand } from "./brand.entity";
import { UpdateBrandDto } from "./dto/update.brand.dto";

@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post("/create")
  async createBrand(
    @Body() dto: CreateBrandDto,
  ): Promise<{ message: string; brand: Brand }> {
    return this.brandsService.createBrand(dto);
  }
  @Get("/getOne/:id")
  async getOneBrand(
    @Param("id") id: string,
  ): Promise<{ message: string; brand: Brand }> {
    return this.brandsService.getOneBrand(id);
  }
  @Get("/get")
  async getAllBrand(): Promise<{ message: string; brand: Brand[] }> {
    return this.brandsService.getAllBrand();
  }
  @Put("/edit/:id")
  async updateBrand(
    @Param("id") id: string,
    @Body() dto: UpdateBrandDto,
  ): Promise<{ message: string; brand: Brand }> {
    return this.brandsService.updateBrand(id, dto);
  }
  @Delete("/delete/:id")
  async deleteBrand(@Param("id") id: string): Promise<{ message: string }> {
    return this.brandsService.deleteBrand(id);
  }
}
