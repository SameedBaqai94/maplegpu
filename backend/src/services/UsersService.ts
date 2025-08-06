
import { UsersCreateDto } from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";


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
        console.log(user.email, user.passwordHashed);
        const findUser = await findUserService(user.email);
        if (!findUser) {
            return { error: "User not found" }
        }
        if (!await bcrypt.compare(user.passwordHashed, findUser.passwordHashed)) {
            return { error: "User not verified" }
        }
        const token = jwt.sign(
            { id: findUser.id, email: findUser.email, name: findUser.name },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "1h" }
        );

        return { response: token }
    } catch (e) {
        return { error: (e as Error).message }
    }
}