import { GpuReadDto } from "./Gpu";

interface Users {
    id: number;
    name: string;
    email: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
    listings?: GpuReadDto[];
}

export interface UsersCreateDto {
    name?: string;
    email: string;
    passwordHashed: string;
}

export interface UsersReadDto {
    name: string;
    email: string;
    listings?: GpuReadDto[];
}