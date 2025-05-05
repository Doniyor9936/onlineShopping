import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create.wishlist.dto";
import { Wishlist } from "./wishlist.entity";
import { UpdateWishlistDto } from "./dto/update.wishlist.dto";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post("/create")
  async createWishlist(
    @Body() dto: CreateWishlistDto,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    return this.wishlistService.createWishlist(dto);
  }
  @Get("/getOne/:id")
  async getOne(
    @Param("id") id: string,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    return this.wishlistService.getOneWishlist(id);
  }
  @Get("/getAll")
  async getAll(): Promise<{ message: string; wishlist: Wishlist[] }> {
    return this.wishlistService.getAllWishlist();
  }
  @Put("/edit/:id")
  async updateWishlist(
    @Param("id") id: string,
    @Body() dto: UpdateWishlistDto,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    return this.wishlistService.updateWishlist(id, dto);
  }
  @Delete("delete/:id")
  async deleteWishlist(@Param("id") id: string): Promise<{ message: string }> {
    return this.wishlistService.deleteWishlist(id);
  }
}
