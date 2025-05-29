interface Users {
    id: number;
    name: string;
    email: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;

    lists: ListReadDto[];
}

export interface UsersCreateDto {
    name?: string;
    email: string;
    passwordHashed: string;
}

export interface UsersReadDto {
    name: string;
    email: string;
}

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
}

export interface List {
    id: number;
    title: string;
    description: string;
    price: number;
    condition: string;
    image: string;
    sellerId: number;
    gpuId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ListWriteDto {
    title: string;
    description: string;
    price: number;
    condition: string;
    image: string;
    sellerId: number;
    gpuId: number;
    status: string;
}

export interface ListReadDto {
    title: string;
    description: string;
    price: number;
    condition: string;
    image: string;
    status: string;
}