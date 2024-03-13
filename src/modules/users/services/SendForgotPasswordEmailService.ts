
import { getCustomRepository } from "typeorm";
import path from "path";
import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "../../../config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmail {
  public async execute({ email }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepositoy = getCustomRepository(UsersTokenRepository);

    const userExists = await usersRepository.findByEmail(email);
    if (!userExists) {
      throw new AppError("User does not exists", 404);
    }

    const { token } = await usersTokensRepositoy.generate(userExists.id);

    const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await EtherealMail.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email
      },
      subject: "[API ECOMMERCE] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userExists.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        }
      }
    })
  }
}

export default SendForgotPasswordEmail;
