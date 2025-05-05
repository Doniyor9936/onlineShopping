import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { CreateCartDto } from './dto/create.cart.dto';
import { UpdateCartDto } from './dto/update.cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) { }

    async createCart(dto: CreateCartDto): Promise<{ message: string, cart: Cart }> {
        try {
            const createCart = this.cartRepository.create({ ...dto })
            await this.cartRepository.save(createCart)
            return { message: "cart succesfully create", cart: createCart }
        }
        catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async getOneCart(id: string): Promise<{ message: string, cart: Cart }> {
        try {
            const existCart = await this.cartRepository.findOne({ where: { id } })
            if (!existCart) {
                throw new NotFoundException("cart not found");
            }
            return { message: "cart", cart: existCart }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async getAllCart(): Promise<{ message: string, cart: Cart[] }> {
        try {
            const existCart = await this.cartRepository.find()
            if (!existCart) {
                throw new NotFoundException("cart not found");
            }
            return { message: "cart list", cart: existCart }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async editCart(id: string, dto: UpdateCartDto): Promise<{ message: string, cart: Cart }> {
        try {
            const existCart = await this.cartRepository.findOne({ where: { id } })
            if (!existCart) {
                throw new NotFoundException("cart not found");
            }
            await this.cartRepository.update(id, dto)
            const editCart = await this.cartRepository.findOne({ where: { id } })
            if (!editCart) {
                throw new UnauthorizedException("cart can not edit");
            }
            return { message: "succesfully edit cart", cart: editCart }

        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
    async deleteCart(id: string): Promise<{ message: string }> {
        try {
            const existCart = await this.cartRepository.findOne({ where: { id } })
            if (!existCart) {
                throw new NotFoundException("cart not found");
            }
            await this.cartRepository.remove(existCart)
            return { message: "succes delete" }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
}
