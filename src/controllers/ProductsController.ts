import { Request, Response } from "express";

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
		const { name, price } = request.body;
		// response.send(`Produto: ${name} | Valor: ${price}`);

		if (!name || !price) {
			return response.status(400).json({ error: 'Os campos "name" e "price" são obrigatórios' });
		}

		throw new Error("ERRO DE EXEMPLO!");

		// Passando a resposta em JSON
		return response.status(201).json({ name, price, user_id: request.user_id });
	}
}

export { ProductsController };
