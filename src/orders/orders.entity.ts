import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum OrderStatus {
  PENDING = "pending",
  PROCESS = "process",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  totalPrice: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Product, (product) => product.order)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
