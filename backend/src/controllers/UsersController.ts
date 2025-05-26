import { Request, Response } from "express";
import { UsersCreateDto } from "../models/Users";
import { createUsersService } from "../services/UsersService";

export const createUsersController = async (req: Request<{}, {}, UsersCreateDto>, res: Response): Promise<any> => {
    const { name, email, passwordHashed } = { ...req.body };

    if (name === "" || email === "" || passwordHashed === "") {
        return res.status(400).json({ error: "One of the fields is empty" })
    }

    const createNewUser = await createUsersService({ name, email, passwordHashed });

    if (createNewUser.response) {
        return res.status(200).json({ response: createNewUser.response })
    } else {
        return res.status(400).json({ error: createNewUser.error })
    }
}

export const signInUserController = async (req: Request<{}, {}, UsersCreateDto>, res: Response): Promise<any> => {
    const { email, passwordHashed } = { ...req.body };

    if (email === "" || passwordHashed === "") {
        return res.status(400).json({ error: "One of the fields is empty" })
    }

    const signInUser = await createUsersService({ email, passwordHashed });

    if (signInUser.response) {
        return res.status(200).json({ response: signInUser.response })
    } else {
        return res.status(400).json({ error: signInUser.error })
    }
}