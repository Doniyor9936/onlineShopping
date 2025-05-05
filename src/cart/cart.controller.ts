import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create.cart.dto';
import { Cart } from './cart.entity';
import { UpdateCartDto } from './dto/update.cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post("/createCart")
  async createCart(@Body() dto: CreateCartDto): Promise<{ message: string, cart: Cart }> {
    return this.cartService.createCart(dto)
  }
  @Get("/getOneCart/:id")
  async getOneCart(@Param("id") id: string): Promise<{ message: string, cart: Cart }> {
    return this.cartService.getOneCart(id)
  }
  @Get("/getCarts")
  async getCart(): Promise<{ message: string, cart: Cart[] }> {
    return this.cartService.getAllCart()
  }
  @Put("/editCart/:id")
  async editCart(@Param("id") id: string, @Body() dto: UpdateCartDto): Promise<{ message: string, cart: Cart }> {
    return this.cartService.editCart(id, dto)
  }
  @Delete("/delete/:id")
  async deleteCart(@Param("id") id: string): Promise<{ message: string }> {
    return this.cartService.deleteCart(id)
  }
}
