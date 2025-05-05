import { IsEmail, IsPhoneNumber, IsString, Matches } from "class-validator";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsPhoneNumber()
  @Matches(/^\+998[0-9]{9}$/, {
    message:
      "Phone number must be in the format +998XXXXXXXXX (only digits allowed)",
  })
  phoneNumber: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.contact)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
