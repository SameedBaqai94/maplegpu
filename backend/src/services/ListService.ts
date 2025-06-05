import { PrismaClient } from "../generated/prisma";
import { GPUReadDto, GPUWriteDto } from "../models/Gpu";
import { ListWriteDto } from "../models/List";
import { createGpuService } from "./GpuService";

const prisma = new PrismaClient();

interface ResponseInterface {
    response?: string;
    error?: Error | string;
}

export async function getAllLists(): Promise<ResponseInterface> {
    try {
        const lists = await prisma.list.findMany();
        return { response: JSON.stringify(lists) };
    } catch (err) {
        return { error: (err as Error).message };
    }
}

export async function getListById(id: number): Promise<ResponseInterface> {
    try {
        const list = await prisma.list.findUnique({ where: { id } });
        if (!list) {
            return { error: "List not found" };
        }
        return { response: JSON.stringify(list) };
    } catch (err) {
        return { error: (err as Error).message };
    }
}

export async function createList(list: ListWriteDto, gpu: GPUWriteDto): Promise<ResponseInterface> {
    try {
        let gpuRecord = await prisma.gPU.findFirst({
            where: { name: gpu.name, manufacturer: gpu.manufacturer }
        });

        if (!gpuRecord) {
            gpuRecord = await prisma.gPU.create({ data: gpu });
        }

        const newList = await prisma.list.create({
            data: {
                ...list,
                gpuId: gpuRecord.id
            }
        });

        return { response: "List created" };
    } catch (err) {
        return { error: (err as Error).message };
    }
}