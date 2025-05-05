import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { Wishlist } from './wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Product, User])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule { }
