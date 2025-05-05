import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWishlistDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    productId: string;
}
