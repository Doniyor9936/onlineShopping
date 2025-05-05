import { IsNotEmpty, IsUUID } from "class-validator";
import { Cart } from "src/cart/cart.entity";
import { Contact } from "src/contact/contact.entity";
import { Order } from "src/orders/orders.entity";
import { Product } from "src/product/product.entity";
import { Wishlist } from "src/wishlist/wishlist.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Table,
  OneToMany,
  OneToOne,
  ManyToMany,
} from "typeorm";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToOne(() => Contact, (contact) => contact.user)
  contact: Contact[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];
}
