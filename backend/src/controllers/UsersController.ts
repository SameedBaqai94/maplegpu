import { Request, Response } from "express";
import { UsersCreateDto } from "../models/Users";
import { createUsersService, signInUsersService } from "../services/UsersService";
import { CustomRequest } from "../middleware/jwtUtil";
import { JwtPayload } from "jsonwebtoken";
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

    const signInUser = await signInUsersService({ email, passwordHashed });

    if (signInUser.response) {
        res.cookie('access_token', signInUser.response, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: true
        })
        return res.status(200).json({ response: "Logged in successfully" })
    } else {
        return res.status(400).json({ error: "Invalid credentials" })
    }
}

export const verifyJWTController = async (req: Request, res: Response) => {
    const customReq = req as unknown as CustomRequest;
    const jwtpayload = customReq.response as JwtPayload;
    if (jwtpayload.id) {
        return res.status(200).json({ jwtpayload });
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }

}