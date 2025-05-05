import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { BrandsModule } from './brands/brands.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { ContactModule } from './contact/contact.module';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
  TypeOrmModule.forRoot({
    type: "postgres",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    entities: [User, Category, Product],
    synchronize: true,
    autoLoadEntities: true
  }), UserModule, CategoryModule, ProductModule, BrandsModule, CartModule, WishlistModule, OrdersModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
