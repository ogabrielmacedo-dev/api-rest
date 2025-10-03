import { Router } from "express";
import { myMiddleware } from "../middlewares/my-middleware";
import { ProductsController } from "../controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductsController();

// ROUTE PARAMS
// app.get("/products/:id/:user", (request, response) => {
// 	const { id, user } = request.params;
// 	response.send(`Produto ${id} do usuário ${user}`);
// });

// QUERY PARAMS
productsRoutes.get("/", productsController.index);

// Middleware Global. (Aplica para todas as rotas abaixo)
// app.use(myMiddleware);

// Middleware local em uma rota específica
productsRoutes.post("/", myMiddleware, productsController.create);

export { productsRoutes };
