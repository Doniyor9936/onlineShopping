import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../orders.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}
