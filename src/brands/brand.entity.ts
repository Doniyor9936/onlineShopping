import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('brand')
export class Brand {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    logo: string
}