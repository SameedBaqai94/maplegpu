import { beforeEach, afterEach, expect, describe, it } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "../src/index";
import prisma from "../src/lib/prisma";

describe('Auth endpoints', () => {

    beforeEach(async () => {
        process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
        await prisma.users.deleteMany();
        const hashedPassword = await bcrypt.hash("dawg1994", 10);
        await prisma.users.create({
            data: {
                email: "dawg@gmail.com",
                name: "dawg",
                passwordHashed: hashedPassword
            }
        });
    });


    describe("POST /api/users/login", () => {
        it("should login with valid credentials", async () => {
            const response = await request(app)
                .post("/api/users/login")
                .send({
                    email: "dawg@gmail.com",
                    passwordHashed: "dawg1994"
                });
            expect(response.status).toBe(200);
        })
    })
    afterEach(async () => {
        await prisma.users.deleteMany();
    });
})