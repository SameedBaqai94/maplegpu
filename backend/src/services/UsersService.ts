import { PrismaClient } from "../generated/prisma";
import { UsersCreateDto } from "../models/Users";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface ResponseInterface {
    response?: string;
    error?: Error | string;
}

export const createUsersService = async (user: UsersCreateDto): Promise<ResponseInterface> => {
    try {
        if (!user.name) {
            return { error: "User name is required" }
        }
        const salt = await bcrypt.genSalt(10);

        const createUser = await prisma.users.create({
            data: {
                email: user.email,
                name: user.name,
                passwordHashed: await bcrypt.hash(user.passwordHashed, salt)
            }
        })
        return { response: "User Created" }
    } catch (e) {
        return { error: (e as Error).message }
    }
}

const findUserService = async (email: string) => {
    return await prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

export const signInUsersService = async (user: UsersCreateDto): Promise<ResponseInterface> => {
    try {
        const findUser = await findUserService(user.email);
        if (!findUser) {
            return { error: "User not found" }
        }
        if (!await bcrypt.compare(user.passwordHashed, findUser.passwordHashed)) {
            return { response: "User not verified" }
        }
        return { response: "User verified" }
    } catch (e) {
        return { error: (e as Error).message }
    }
}