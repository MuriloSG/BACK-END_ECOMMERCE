
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "../../..//config/mail/EtherealMail";

interface IRequest{
  email: string;
}

class SendForgotPasswordEmail{
  public async execute({ email }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepositoy = getCustomRepository(UsersTokenRepository);

    const userExists = await usersRepository.findByEmail(email);
    if (!userExists) {
      throw new AppError("User does not exists", 404);
    }

    const {token} = await usersTokensRepositoy.generate(userExists.id);

    await EtherealMail.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email
      },
      subject: "[API ECOMMERCE] Recuperação de senha",
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: userExists.name,
          token
        }
      }
    })
  }
}

export default SendForgotPasswordEmail;
