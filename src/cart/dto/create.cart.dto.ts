import { IsNumber, IsString } from "class-validator";

export class CreateCartDto {
  @IsNumber()
  quantity: number;
}
