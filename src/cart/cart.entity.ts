import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => User, (user) => user.cart, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Product, (product) => product.cart, { onDelete: "CASCADE" })
  product: Product[];
}
