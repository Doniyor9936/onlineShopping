import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import {
  compareHashPassword,
  generateHashPassword,
} from "src/util/password.service";
import { UpdateUserDto } from "./dto/update.user.dto";
import { sendEmail } from "src/util/email.service";
import { LoginDto } from "./dto/login.dto";
import * as jsonwebtoken from "jsonwebtoken";
import { CreateUserDto } from "./dto/create.user.dto";
import { decodedToken, generateToken } from "src/util/token.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async register(dto: CreateUserDto): Promise<{ message: string; user: User }> {
    const existUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existUser) {
      throw new ConflictException("user already exist");
    }
    dto.password = await generateHashPassword(dto.password);
    const registr = this.userRepository.create({ ...dto });
    await sendEmail(
      dto.email,
      "message",
      "You have successfully registered from the site.",
    );
    await this.userRepository.save(registr);
    return { message: "create user", user: registr };
  }
  async login(dto: LoginDto): Promise<{ message: string; token: string }> {
    try {
      const { email, password } = dto;
      const existUser = await this.userRepository.findOne({ where: { email } });
      if (!existUser) {
        throw new NotFoundException("User not found");
      }
      const isMatch = await compareHashPassword(password, existUser.password);
      if (!isMatch) {
        throw new UnauthorizedException("incorrect email or password");
      }
      const payload = { id: existUser.id, email: existUser.email };
      const token = await generateToken(payload);
      return { message: "succesfully login", token: token };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getAllUser(): Promise<{ message: string; user: User[] }> {
    try {
      const existUser = await this.userRepository.find();
      if (!existUser) {
        throw new NotFoundException("user not found");
      }
      return { message: "all users", user: existUser };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
  async getOneUser(id: string): Promise<{ message: string; user: User }> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!existUser) {
        throw new NotFoundException("user not found");
      }
      return { message: "user", user: existUser };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
  async editUser(
    id: string,
    dto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const existUser = await this.userRepository.findOne({ where: { id } });
      if (!existUser) {
        throw new NotFoundException("user not found");
      }
      await this.userRepository.update(id, dto);
      const editUser = await this.userRepository.findOne({ where: { id } });
      if (!editUser) {
        throw new NotFoundException("user not found after update");
      }
      return { message: "succes update", user: editUser };
    } catch (error) {
      console.log({ message: error.message });
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const existUser = await this.userRepository.findOne({ where: { id } });
      if (!existUser) {
        throw new NotFoundException("user not found");
      }
      await this.userRepository.delete(existUser);
      return { message: "succes delete" };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
  async logout(id: string): Promise<{ message: string }> {
    try {
      const existUser = await this.userRepository.findOne({ where: { id } });
      if (!existUser) {
        throw new UnauthorizedException("user not found");
      }
      existUser.isActive = false;
      await this.userRepository.save(existUser);
      return { message: "succesfully logout system" };
    } catch (error) {
      throw new InternalServerErrorException("server error");
    }
  }
}
