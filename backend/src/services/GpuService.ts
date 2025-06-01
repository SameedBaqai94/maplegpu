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

export const getGpuById = async (id: number): Promise<ResponseInterface> => {
    try {
        const gpu = await prisma.gPU.findFirst({
            where: {
                id: id
            }
        });

        if (!gpu) {
            return { error: "No GPU found" }
        }
        return { response: gpu }
    } catch (e) {
        return { error: (e as Error).message }
    }
}

export const updateGpuById = async (id: number, gpu: GPUWriteDto): Promise<ResponseInterface> => {
    try {
        const getGpu = await getGpuById(id);

        if (!getGpu) {
            return { error: "No GPU found" }
        }
        const updateGpu = await prisma.gPU.update({
            where: {
                id: id
            },
            data:
            {
                name: gpu.name,
                manufacturer: gpu.manufacturer
            }
        })
        return { response: "gpu updated" }
    } catch (e) {
        return { error: (e as Error).message }
    }
}

export const deleteGpuById = async (id: number): Promise<ResponseInterface> => {
    try {
        const gpu = await prisma.gPU.findUnique({ where: { id } });
        if (!gpu) {
            return { error: "No GPU found" };
        }
        await prisma.gPU.delete({ where: { id } });
        return { response: "GPU deleted" };
    } catch (e) {
        return { error: (e as Error).message };
    }
};