import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty({ message: "Name mandatory" })
  name: string;

  @IsEmail({}, { message: "Email inccorrect format" })
  @IsNotEmpty({ message: "Email must be fill" })
  email: string;

  @IsNotEmpty({ message: "message must be fill" })
  message: string;

  @Matches(/^\+998[0-9]{9}$/, {
    message:
      "Phone number must be in the format +998XXXXXXXXX (only digits allowed)",
  })
  @IsNotEmpty({ message: "Phone number must not be empty" })
  phoneNumber: string;
}
