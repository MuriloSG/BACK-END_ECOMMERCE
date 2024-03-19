import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomersRepositoriy";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email}: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found', 404);
    }

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists && email !== customer.email) {
      throw new AppError("Email already exists");
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
