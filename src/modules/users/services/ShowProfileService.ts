import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_Id: string;
}

class ShowProfileService {
  public async execute({ user_Id }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_Id)

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default ShowProfileService;
