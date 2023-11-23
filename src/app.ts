import "dotenv/config";
import express, { Request, Response, NextFunction } from 'express';
import cardRoutes from './routes/cardRoutes';

const app = express();

app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && req.method !== "GET") {
        console.error(err);
        return res.status(400).send('Error en el formato del cuerpo de la solicitud');
    }
    next();
});

app.use("/api/cards", cardRoutes);

export default app;