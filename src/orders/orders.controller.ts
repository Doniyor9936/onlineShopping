import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create.orders.dto";
import { Order } from "./orders.entity";
import { UpdateOrderDto } from "./dto/update.orders.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post("/createOrder")
  async createOrder(
    @Body() dto: CreateOrderDto,
  ): Promise<{ message: string; order: Order }> {
    return this.ordersService.createOrder(dto);
  }
  @Get("/getOrder/:id")
  async getOneOrder(
    @Param("id") id: string,
  ): Promise<{ message: string; order: Order }> {
    return this.ordersService.getOneOrder(id);
  }
  @Get("/getAll")
  async getAllOrder(): Promise<{ message: string; order: Order[] }> {
    return this.ordersService.getAllOrder();
  }
  @Put("/edit/:id")
  async updateOrder(
    @Param("id") id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<{ message: string; order: Order }> {
    return this.ordersService.updateOrder(id, dto);
  }
  @Delete("/delete/:id")
  async deleteOrder(@Param("id") id: string): Promise<{ message: string }> {
    return this.ordersService.deleteOrder(id);
  }
}
