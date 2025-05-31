import { GPUReadDto, GPUWriteDto } from "../models/Gpu";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

interface ResponseInterface {
    response?: string | GPUReadDto | GPUReadDto[];
    error?: Error | string;
}

export const createGpuService = async (gpuData: GPUWriteDto): Promise<ResponseInterface> => {
    try {
        const newGpu = await prisma.gPU.create({
            data: {
                name: gpuData.name,
                manufacturer: gpuData.manufacturer
            }
        })
        return { response: "GPU Created" }
    } catch (e) {
        return { error: (e as Error).message }
    }
};

export const getAllGpusService = async (): Promise<ResponseInterface> => {
    try {
        const gpus = await prisma.gPU.findMany();

        const allGpus: GPUReadDto[] = gpus.map(gpu => ({
            name: gpu.name,
            manufacturer: gpu.manufacturer
        }));

        return { response: allGpus }
    } catch (e) {
        return { error: (e as Error).message }
    }
}