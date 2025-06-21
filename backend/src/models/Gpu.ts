export interface GPU {
    id: number;
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrls: string[];
    city: string;
    isActive?: boolean;
    createdAt?: Date;
    sellerId: number;
}

export interface GpuReadDto {
    title: string;
    price: number;
    condition: string;
    description?: string;
    imageUrls: string[];
    city: string;
    province: string;
}

export interface GpuWriteDto {
    title: string;
    price: number;
    condition: Condition;
    description?: string;
    imageUrls: string[];
    city: string;
    province: string;
    sellerId?: number;
}

export enum Condition {
    New = "new",
    Used = "used"
}