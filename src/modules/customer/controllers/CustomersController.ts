import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute();
    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {

    const { name, email } = request.body;

    const createCustomers = new CreateCustomerService();
    const user = await createCustomers.execute({
      name,
      email,
    });
    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomer = new ShowCustomerService();
    const cutomer = await showCustomer.execute({ id });
    return response.json(cutomer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { email, name } = request.body;
    const { id } = request.params;
    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      email,
      name
    });

    return response.status(204).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response>{

    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();

    const customer = await deleteCustomer.execute({ id });

    return response.status(204).json([]);
  }
}
