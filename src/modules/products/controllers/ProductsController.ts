import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductsService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductsService";
import DeleteProductService from "../services/DeleteProductsService";

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {

    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showProducts = new ShowProductService();
    const product = await showProducts.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {

    const { name, price, quantity, category, description } = request.body;
    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
      category,
      description
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { name, price, quantity, category, description } = request.body;
    const { id } = request.params;

    const updateProducts = new UpdateProductService();
    const product = await updateProducts.execute({
      id,
      name,
      price,
      quantity,
      category,
      description
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteProducts = new DeleteProductService();
    const products = await deleteProducts.execute({ id });

    return response.json([]);

  }
}
