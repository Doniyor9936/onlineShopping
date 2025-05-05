import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'incorrect email format' })
    email?: string;

    @IsOptional()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, { message: "password is stronger mandatory" })
    password?: string;

    @IsOptional()
    @IsString()
    name?: string;
}
