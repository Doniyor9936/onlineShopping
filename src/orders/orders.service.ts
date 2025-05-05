import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Product } from "src/product/product.entity";
import { CreateOrderDto } from "./dto/create.orders.dto";
import { UpdateOrderDto } from "./dto/update.orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createOrder(
    dto: CreateOrderDto,
  ): Promise<{ message: string; order: Order }> {
    try {
      const existsUser = await this.userRepository.findOne({
        where: { id: dto.userId },
      });
      if (!existsUser) {
        throw new NotFoundException("user not found");
      }

      const existsProduct = await this.productRepository.findOne({
        where: { id: dto.productId },
      });
      if (!existsProduct) {
        throw new NotFoundException("product not found");
      }
      const createOrder = this.orderRepository.create({
        ...dto,
        user: existsUser,
        product: existsProduct,
      });
      const saveOrders = await this.orderRepository.save(createOrder);
      return {
        message: "create success order",
        order: saveOrders,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getOneOrder(id: string): Promise<{ message: string; order: Order }> {
    try {
      const existsOrders = await this.orderRepository.findOne({
        where: { id },
      });
      if (!existsOrders) {
        throw new NotFoundException("order not found");
      }
      return { message: "one order", order: existsOrders };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getAllOrder(): Promise<{ message: string; order: Order[] }> {
    try {
      const existsOrders = await this.orderRepository.find();
      if (!existsOrders) {
        throw new NotFoundException("order not found");
      }
      return { message: "orders", order: existsOrders };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async updateOrder(
    id: string,
    dto: UpdateOrderDto,
  ): Promise<{ message: string; order: Order }> {
    try {
      const existsOrders = await this.orderRepository.findOne({
        where: { id },
      });
      if (!existsOrders) {
        throw new NotFoundException("order not found");
      }
      await this.orderRepository.update(id, dto);
      const updateOrder = await this.orderRepository.findOne({ where: { id } });
      if (!updateOrder) {
        throw new NotFoundException("update order not found");
      }
      return { message: "success update order", order: updateOrder };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteOrder(id: string): Promise<{ message: string }> {
    try {
      const existsOrders = await this.orderRepository.findOne({
        where: { id },
      });
      if (!existsOrders) {
        throw new NotFoundException("order not found");
      }
      return { message: "succes delete" };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
}
