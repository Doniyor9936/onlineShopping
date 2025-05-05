import * as bcrypt from "bcryptjs";
export const generateHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};
export const compareHashPassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};
