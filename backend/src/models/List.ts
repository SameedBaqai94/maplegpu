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