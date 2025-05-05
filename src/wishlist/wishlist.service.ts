import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Product } from "src/product/product.entity";
import { CreateWishlistDto } from "./dto/create.wishlist.dto";
import { UpdateWishlistDto } from "./dto/update.wishlist.dto";

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createWishlist(
    dto: CreateWishlistDto,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    try {
      const existsUser = await this.userRepository.findOne({
        where: { id: dto.userId },
      });
      if (!existsUser) {
        throw new NotFoundException("user not found");
      }
      const existsProduct = await this.productRepository.findOne({
        where: { id: dto.productId },
      });
      if (!existsProduct) {
        throw new NotFoundException("product not found");
      }
      const existsWishlist = await this.wishlistRepository.create({
        ...dto,
        user: existsUser,
        product: existsProduct,
      });
      await this.wishlistRepository.save(existsWishlist);
      return { message: "success create wishlist", wishlist: existsWishlist };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getOneWishlist(
    id: string,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    try {
      const existsWishlist = await this.wishlistRepository.findOne({
        where: { id },
      });
      if (!existsWishlist) {
        throw new NotFoundException("wishlist not found");
      }
      return { message: "one wishlist", wishlist: existsWishlist };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getAllWishlist(): Promise<{ message: string; wishlist: Wishlist[] }> {
    try {
      const existsWishlist = await this.wishlistRepository.find();
      if (!existsWishlist) {
        throw new NotFoundException("wishlist not found");
      }
      return { message: "All wishlist", wishlist: existsWishlist };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async updateWishlist(
    id: string,
    dto: UpdateWishlistDto,
  ): Promise<{ message: string; wishlist: Wishlist }> {
    try {
      const existsWishlist = await this.wishlistRepository.findOne({
        where: { id },
      });
      if (!existsWishlist) {
        throw new NotFoundException("wishlist not found");
      }
      await this.wishlistRepository.update(id, dto);
      const updateWishlist = await this.wishlistRepository.findOne({
        where: { id },
      });
      if (!updateWishlist) {
        throw new NotFoundException("wishlist not found");
      }
      return { message: "success edit wishlist", wishlist: updateWishlist };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteWishlist(id: string): Promise<{ message: string }> {
    try {
      const existsWishlist = await this.wishlistRepository.findOne({
        where: { id },
      });
      if (!existsWishlist) {
        throw new NotFoundException("wishlist not found");
      }
      await this.wishlistRepository.remove(existsWishlist);
      return { message: "success delete wishlist" };
    } catch (error) {
      console.error(error);
      throw new Error("server error");
    }
  }
}
