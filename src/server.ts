import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";

// Colocar a porta em uma const facilita caso precise trocar a porta
const PORT = 3333;

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
	response.status(500).json({ message: error.message });
});

// É possível passar uma função de callback
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
