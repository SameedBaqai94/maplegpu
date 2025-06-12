import { PrismaClient } from "../generated/prisma";
import { GpuReadDto, GpuWriteDto } from "../models/Gpu";

const prisma = new PrismaClient();

interface ResponseInterface {
    response?: string | GpuReadDto;
    error?: Error | string;
}

export const createGPUService = async (gpu: GpuWriteDto): Promise<ResponseInterface> => {
    try {
        const newGpu = await prisma.gPU.create({
            data: { ...gpu, sellerId: 1 }
        });
        const newGpuDto: GpuReadDto = {
            title: newGpu.title,
            price: newGpu.price,
            condition: newGpu.condition,
            description: newGpu.description ? newGpu.description : undefined,
            imageUrls: newGpu.imageUrls,
            city: newGpu.city
        }
        return { response: newGpuDto }
    }
    catch (e) {
        return { error: (e as Error).message }
    }
}