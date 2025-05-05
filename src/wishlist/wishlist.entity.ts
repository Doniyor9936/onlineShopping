import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("wishlist")

export class Wishlist {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    productId: string

    @ManyToOne(() => User, (user) => user.wishlist, { onDelete: "CASCADE" })
    user: User

    @ManyToOne(() => Product, (user) => user.wishlist, { onDelete: "CASCADE" })
    product: Product

}