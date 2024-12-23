"use server"

import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcrypt"

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export async function Register (values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!"};
    }

    const { email, password, name} = validatedFields.data;
    const hashedpassword = await bcrypt.hash(password, 12);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "Email is already taken"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedpassword,
        }
    });

    // todo send a verification token email

    return { success: "Acount created"}
}