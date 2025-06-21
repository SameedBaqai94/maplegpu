import { Request, response, Response } from "express";
import { Condition, GpuWriteDto } from "../models/Gpu";
import { createGPUService, getAllGPUsService, getGPUsBySellerIdService, removeGPUService, updateGPUService } from "../services/GpuService";
import { CustomRequest } from "../middleware/jwtUtil";
import { JwtPayload } from "jsonwebtoken";

// Controller to handle GPU listing creation. Extracts JWT payload for seller ID, validates request body, 
// then calls the service to create a new GPU listing. Returns appropriate success or error responses.
export const createGpuController = async (req: Request<{}, {}, GpuWriteDto>, res: Response): Promise<any> => {
    try {
        // Cast request to CustomRequest to access JWT payload
        const customReq = req as CustomRequest;
        const jwtPayload = customReq.response;

        const { title, price, condition, description, imageUrls, city, province } = { ...req.body };
        if (
            !title ||
            title.trim() === "" ||
            price === undefined ||
            condition === undefined ||
            !imageUrls ||
            !city ||
            !province
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!Object.values(Condition).includes(condition)) {
            return res.status(400).json({ error: "Invalid condition. Must be 'new' or 'used'." });
        }

        const newGpuService = await createGPUService({ title, price, condition, imageUrls, city, province, sellerId: (jwtPayload as JwtPayload).id });

        if (newGpuService.error) {
            return res.status(400).json({ error: newGpuService.error });
        }

        return res.status(201).json({ response: newGpuService.response });
    } catch (error) {
        res.status(500).json({ error: "Failed to create GPU listing" });
    }
};

// Get all GPUs Controller
export const getAllGpusController = async (req: Request, res: Response): Promise<any> => {
    try {
        const gpus = await getAllGPUsService();
        res.status(200).json({ response: gpus });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GPU listings" });
    }
};

// Get GPU by ID Controller
export const getGpuBySellerIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const customReq = req as CustomRequest;
        const jwtPayload = (customReq.response as JwtPayload);
        const gpus = await getGPUsBySellerIdService(jwtPayload.id);
        if (gpus.error) {
            return res.status(404).json({ error: gpus.error ? gpus.error : "GPUs not found" });
        }
        res.status(200).json({ response: gpus.response });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GPUs" });
    }
};

// Update GPU Controller
export const updateGpuController = async (req: Request<{ gpuId: string }, {}, GpuWriteDto>, res: Response): Promise<any> => {
    try {
        const { gpuId } = req.params;

        const customReq = req as unknown as CustomRequest;
        const jwtPayload = customReq.response as JwtPayload;

        const updateData: GpuWriteDto = req.body;
        const updatedGpu = await updateGPUService(Number(gpuId), jwtPayload.id, updateData)
        if (!updatedGpu) {
            return res.status(404).json({ error: "GPU not found" });
        }
        res.status(200).json({ response: updatedGpu });
    } catch (error) {
        res.status(500).json({ error: "Failed to update GPU" });
    }
};

// Delete GPU Controller
export const deleteGpuController = async (req: Request<{ gpuId: string }, {}, {}>, res: Response): Promise<any> => {
    try {
        const { gpuId } = req.params;

        const customReq = req as unknown as CustomRequest;
        const jwtPayload = customReq.response as JwtPayload;
        const deleted = await removeGPUService(Number(gpuId), jwtPayload.id);
        if (!deleted) {
            return res.status(404).json({ error: "GPU not found" });
        }
        res.status(200).json({ response: "GPU deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete GPU" });
    }
};