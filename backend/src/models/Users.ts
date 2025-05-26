interface Users {
    id: number;
    name: string;
    email: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersCreateDto {
    name?: string;
    email: string;
    passwordHashed: string;
}