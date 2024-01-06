import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

class CreateProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.find();

    if (product.length === 0) {
      throw new AppError('There are no products', 404);
    }

    return product;
  }
}

export default CreateProductService;

