import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update.user.dto";
import { CreateUserDto } from "./dto/create.user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async register(
    @Body() dto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    return this.userService.register(dto);
  }
  @Post("/login")
  async login(
    @Body() dto: LoginDto,
  ): Promise<{ message: string; token: string }> {
    return this.userService.login(dto);
  }
  @Post("/logout/:id")
  async logout(@Param("id") id: string): Promise<{ message: string }> {
    return this.userService.logout(id);
  }
  @Get("/get")
  async getAllUser(): Promise<{ message: string; user: User[] }> {
    return this.userService.getAllUser();
  }
  @Get("/getOne/:id")
  async getOneUser(
    @Param("id") id: string,
  ): Promise<{ message: string; user: User }> {
    return this.userService.getOneUser(id);
  }
  @Put("/edit/:id")
  async editUser(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    return this.userService.editUser(id, dto);
  }
  @Delete("/delete/:id")
  async deleteUser(@Param("id") id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }
}
