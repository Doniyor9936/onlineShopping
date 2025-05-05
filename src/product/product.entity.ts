import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { IsNotEmpty } from 'class-validator';
import { Brand } from 'src/brands/brand.entity';
import { User } from 'src/user/user.entity';
import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/orders/orders.entity';
import { Wishlist } from 'src/wishlist/wishlist.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    categoryId: string

    @Column()
    @IsNotEmpty()
    productName: string;

    @Column({ type: 'text' })
    description?: string;

    @Column({ nullable: true })
    shortDescription?: string;

    @Column()
    @IsNotEmpty()
    price: number;

    @Column({ nullable: true })
    discountPrice?: number;

    @Column()
    @IsNotEmpty()
    count: number;

    @Column({ default: false })
    isFeatured: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    rating: number;

    @ManyToOne(() => Brand)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(() => User, (user) => user.product, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Cart, (cart) => cart.product, { onDelete: "CASCADE" })
    cart: Cart

    @OneToMany(() => Order, (order) => order.product, { onDelete: "CASCADE" })
    order: Order

    @OneToMany(() => Wishlist, (Wishlist) => Wishlist.product, { onDelete: "CASCADE" })
    wishlist: Wishlist;
}
