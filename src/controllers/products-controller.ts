import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { z } from "zod";

class ProductsController {
	/**
	 * index - GET para listar vários registros.
	 * show - GET para exibir um registro específico.
	 * create - POST para criar um registro.
	 * update - PUT para atualizar um registro.
	 * remove - DELETE para deletar um registro.
	 */

	index(request: Request, response: Response) {
		// products?page=1&limit=10
		const { page, limit } = request.query;
		response.send(`Página ${page} de ${limit}`);
	}

	create(request: Request, response: Response) {
		// response.send(`Produto: ${name} | Valor: ${price}`);

		const bodySchema = z.object({
			name: z
				.string({ required_error: "Name is required" })
				.trim()
				.min(6, { message: "Name must be 6 or more characters" }),
			price: z.number({ required_error: "Price is required" }).positive({ message: "Price must be positive" }),
			// nullish() serve para deixar o campo opcional na requisição
		});

		const { name, price } = bodySchema.parse(request.body);

		if (!name || !price) {
			throw new AppError("O nome e preço do produto são obrigatórios");
		}

		// throw new Error("Erro ao tentar criar um produto");
		// throw new AppError("Erro ao tentar criar um produto");

		// Passando a resposta em JSON
		return response.status(201).json({ name, price, user_id: request.user_id });
	}
}

export { ProductsController };
