import { Request, response, Response } from "express";
import { GpuWriteDto } from "../models/Gpu";
import { createGPUService } from "../services/GpuService";


export const createGpuController = async (req: Request<{}, {}, GpuWriteDto>, res: Response): Promise<any> => {
    try {
        const { title, price, condition, description, imageUrls, city, sellerId } = { ...req.body };
        if (
            !title ||
            title.trim() === "" ||
            price === undefined ||
            condition === undefined ||
            !imageUrls ||
            !city ||
            sellerId === undefined
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newGpuService = await createGPUService({ title, price, condition, imageUrls, city, sellerId });

        if (newGpuService.error) {
            return res.status(400).json({ error: newGpuService.error });
        }

        return res.status(201).json({ response: newGpuService.response });
    } catch (error) {
        res.status(500).json({ error: "Failed to create GPU listing" });
    }
};