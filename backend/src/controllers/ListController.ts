import { Request, Response } from "express";
import { ListWriteDto } from "../models/List";
import { GPUWriteDto } from "../models/Gpu";
import { CustomRequest } from "../middleware/jwtUtil";


export const createListController = async (req: Request<{}, {}, ListWriteDto & { gpu: GPUWriteDto }>, res: Response): Promise<any> => {
    const { gpu, ...listData } = req.body;
    const userFromToken = (req as CustomRequest).response;

    res.status(200).json({ response: userFromToken });

}