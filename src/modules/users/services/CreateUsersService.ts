
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest{
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class CreateUsersServices{
  public async execute({name, email, password, isAdmin}: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already one user with this email');
    }

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsersServices;
