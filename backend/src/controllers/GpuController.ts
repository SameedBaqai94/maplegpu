import { Request, Response } from "express";
import { GPUWriteDto } from "../models/Gpu";
import { createGpuService, getAllGpusService } from "../services/GpuService";

export const creatGpuController = async (req: Request<{}, {}, GPUWriteDto>, res: Response): Promise<any> => {
    const { name, manufacturer } = { ...req.body };
    const newGpuService = await createGpuService({ name, manufacturer });
    if (newGpuService.error) {
        return res.status(400).json({ error: newGpuService.error })
    }
    return res.status(201).json({ response: newGpuService.response });
}
// Get all GPUs
export const getAllGpusController = async (req: Request, res: Response): Promise<any> => {
    // ...implementation...
    const getAllGpus = await getAllGpusService();
    if (getAllGpus.error) {
        return res.status(400).json({ error: getAllGpus.error })
    }
    return res.status(201).json({ response: getAllGpus.response });
};

// Get GPU by ID
export const getGpuByIdController = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    // ...implementation...
};

// Update GPU
export const updateGpuController = async (req: Request<{ id: string }, {}, GPUWriteDto>, res: Response): Promise<any> => {
    // ...implementation...
};

// Delete GPU
export const deleteGpuController = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    // ...implementation...
};