import { EntityRepository, Repository } from "typeorm"
import User from "../entities/User";

@EntityRepository(User)
export  class UsersRepository extends Repository<User>{
  public async FindByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      }
    });
    return user;
  }

  public async FindById(id: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        id,
      }
    });
    return user;
  }

  public async FindByEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        email,
      }
    });
    return user;
  }
}
