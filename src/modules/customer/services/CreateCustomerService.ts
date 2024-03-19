

import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomersRepositoriy";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email}: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('There is already one user with this email');
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
export default CreateCustomerService;
