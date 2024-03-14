import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_Id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ user_Id, name, email, password, old_password }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_Id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== user_Id) {
      throw new AppError("Email already exists");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;