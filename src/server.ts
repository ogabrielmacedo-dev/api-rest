import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./utils/app-error";
import { ZodError } from "zod";

// Colocar a porta em uma const facilita caso precise trocar a porta
const PORT = 3333;

const app = express();

app.use(express.json());

app.use(routes);

/**
 * ERRO DO CLIENTE
 * 400 (Bad Request): Erro do cliente
 *
 * ERRO DO SERVIDOR
 * 500 (Internal Server Error): Erro interno do servidor
 */

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	if (error instanceof ZodError) {
		return response.status(400).json({ message: "Validation error!", issues: error.format() });
	}

	return response.status(500).json({ message: error.message });
});

// É possível passar uma função de callback
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
