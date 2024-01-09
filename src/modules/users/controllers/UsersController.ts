import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUsersServices from "../services/CreateUsersService";

export default class UsersController{
  public async index(request: Request, response: Response): Promise<Response> {

    const listUsers = new ListUsersService();
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response>{

    const { name, email, password, isAdmin } = request.body;

    const createUsers = new CreateUsersServices();
    const user = await createUsers.execute({
      name,
      email,
      password,
      isAdmin
    });
    return response.json(user);
  }
}
