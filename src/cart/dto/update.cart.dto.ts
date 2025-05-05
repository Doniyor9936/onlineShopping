import { IsNumber, IsString } from "class-validator";

export class UpdateCartDto {
    @IsNumber()
    quantity?: number
}