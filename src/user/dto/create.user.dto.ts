import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "incorrect email format" })
  @IsString()
  @IsNotEmpty({ message: "cannot be empty" })
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: "password is stronger mandatory" },
  )
  @IsString()
  @IsNotEmpty({ message: "password be mandatory" })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "name be mandatory" })
  name: string;
}
