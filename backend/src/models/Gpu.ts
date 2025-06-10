export interface GPU {
    id: string;
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrls: string[];
    city: string;
    isActive?: boolean;
    createdAt?: Date;
}

export interface GpuReadDto {
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrls: string[];
    city: string;
}

export interface GpuWriteDto {
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrls: string[];
    city: string;
}