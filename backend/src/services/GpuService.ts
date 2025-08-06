import prisma from "../lib/prisma";
import { GpuReadDto, GpuWriteDto } from "../models/Gpu";



interface ResponseInterface {
    response?: string | GpuReadDto | GpuReadDto[] | boolean;
    error?: Error | string;
}

export const createGPUService = async (gpu: GpuWriteDto): Promise<ResponseInterface> => {
    try {
        if (gpu.sellerId === undefined) {
            return { error: "sellerId is required" };
        }
        if ((await checkIfGpuExists(gpu.title, gpu.sellerId)).response) {
            return { error: "GPU Already Exists" }
        }
        const newGpu = await prisma.gPU.create({
            data: { ...gpu, sellerId: gpu.sellerId }
        });
        const newGpuDto: GpuReadDto = {
            title: newGpu.title,
            price: newGpu.price,
            condition: newGpu.condition,
            description: newGpu.description ? newGpu.description : undefined,
            imageUrls: newGpu.imageUrls,
            city: newGpu.city,
            province: newGpu.province
        }
        return { response: newGpuDto }
    }
    catch (e) {
        return { error: (e as Error).message }
    }
}

export const checkIfGpuExists = async (gpuName: string, userId: number): Promise<ResponseInterface> => {
    try {
        const gpu = await prisma.gPU.findFirst({
            where: {
                title: gpuName,
                sellerId: userId
            }
        });
        if (gpu) {
            return { response: true }
        }
        return { response: false }
    }
    catch (e) {
        return { error: (e as Error).message }
    }
}

export const getAllGPUsService = async (): Promise<ResponseInterface> => {
    try {
        const gpus = await prisma.gPU.findMany();

        if (gpus) {
            const readGPUs: GpuReadDto[] = gpus.map(gpu => ({
                title: gpu.title,
                price: gpu.price,
                condition: gpu.condition,
                description: gpu.description ? gpu.description : undefined,
                imageUrls: gpu.imageUrls,
                city: gpu.city,
                province: gpu.province
            }))
            return { response: readGPUs }
        }
        return { response: "You dont have any GPU listed" }
    }

    catch (e) {
        return { error: (e as Error).message }
    }
}

export const getAllGPUsBy = async (): Promise<ResponseInterface> => {
    try {
        const gpus = await prisma.gPU.findMany();

        if (gpus) {
            const readGPUs: GpuReadDto[] = gpus.map(gpu => ({
                title: gpu.title,
                price: gpu.price,
                condition: gpu.condition,
                description: gpu.description ? gpu.description : undefined,
                imageUrls: gpu.imageUrls,
                city: gpu.city,
                province: gpu.province
            }));
            return { response: readGPUs }
        }
        return { response: "You dont have any GPU listed" }
    }

    catch (e) {
        return { error: (e as Error).message }
    }
}

export const getGPUsBySellerIdService = async (userId: number): Promise<ResponseInterface> => {
    try {
        const getGpus = await prisma.users.findFirst({
            where: {
                id: userId
            },
            include: {
                listings: true
            }
        });

        if (getGpus) {
            const gpus: GpuReadDto[] = getGpus.listings.map(gpu => ({
                title: gpu.title,
                price: gpu.price,
                condition: gpu.condition,
                description: gpu.description ? gpu.description : undefined,
                imageUrls: gpu.imageUrls,
                city: gpu.city,
                province: gpu.province
            }));
            return { response: gpus }
        }
        return { error: "You dont have any GPU listed" }
    }

    catch (e) {
        return { error: (e as Error).message }
    }
}

export const updateGPUService = async (gpuId: number, userId: number, gpu: GpuWriteDto): Promise<ResponseInterface> => {
    try {
        const getGpus = await prisma.gPU.findFirst({
            where: {
                id: gpuId,
                sellerId: userId
            }
        });
        if (getGpus) {
            const updateGpu = await prisma.gPU.update({
                where: {
                    id: userId
                },
                data: { ...gpu }
            });
            return { response: "GPU Updated" }
        }

        return { response: "You dont have any GPU listed" }
    }

    catch (e) {
        return { error: (e as Error).message }
    }
}

export const removeGPUService = async (gpuId: number, userId: number): Promise<ResponseInterface> => {
    try {
        const getGpus = await prisma.gPU.findFirst({
            where: {
                id: gpuId,
                sellerId: userId
            }
        });
        if (getGpus) {
            const deleteGPU = await prisma.gPU.delete(
                {
                    where: {
                        id: getGpus.id
                    }
                }
            )
            return { response: "GPU Deleted" }
        }

        return { response: "You dont have any GPU listed" }
    }

    catch (e) {
        return { error: (e as Error).message }
    }
}