import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomersRepositoriy";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.find();

    if (customers.length === 0) {
      throw new AppError('There are no users', 404);
    }

    return customers;
  }
}

export default ListCustomerService;
