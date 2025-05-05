import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    categoryId: string

    @IsString()
    @IsNotEmpty()
    productName: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    disCountPrice: number

    @IsNumber()
    @IsNotEmpty()
    count: number
}