import { Request, Response } from "express";
import { GPUWriteDto } from "../models/Gpu";

export const creatGpuController = async (req: Request<{}, {}, GPUWriteDto>, res: Response): Promise<any> => {

}
// Get all GPUs
export const getAllGpusController = async (req: Request, res: Response): Promise<any> => {
    // ...implementation...
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