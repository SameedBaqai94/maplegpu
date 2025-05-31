import { ListReadDto } from "./List";

export interface GPU {
    id: number;
    name: string;
    manufacturer: string;
    lists: ListReadDto[];
}

export interface GPUWriteDto {
    name: string;
    manufacturer: string;
}

export interface GPUReadDto {
    name: string;
    manufacturer: string;
    lists?: ListReadDto[];
}