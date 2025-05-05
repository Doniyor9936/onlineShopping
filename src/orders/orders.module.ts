import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
