import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "please provide a valid email"
    }),
    password: z.string().min(1, {
        message: "password is required"
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "please provide a valid email"
    }),
    password: z.string().min(8, {
        message: "Minumum of 8 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
});
