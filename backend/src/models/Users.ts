import { ListReadDto } from "./List";

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
    lists: ListReadDto[];
}