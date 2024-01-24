import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours} from "date-fns";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "../typeorm/repositories/UsersTokensRepository";
import { hash } from "bcryptjs";

interface IRequest{
  token: string;
  password: string,
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepositoy = getCustomRepository(UsersTokenRepository);

    const userToken = await usersTokensRepositoy.findByToken(token);
    if (!userToken) {
      throw new AppError("User token does not exists", 404);
    }

    const userExists = await usersRepository.findById(userToken.id);
    if (!userExists) {
      throw new AppError("User does not exists", 404);
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }
    
    const hashedPassword = await hash(password, 8);
    userExists.password = hashedPassword;

    await usersRepository.save(userExists);

  }
}

export default ResetPasswordService;
