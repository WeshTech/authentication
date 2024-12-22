"use client"

import { CardWrapper } from "./card-wrapper";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Register } from "@/actions/register";

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setsuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setsuccess("");

        startTransition(() => {
            Register(values)
            .then((data) => {
                setError(data.error);
                setsuccess(data.success);
            })
        });
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel = "Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                    <FormField
                            control = {form.control}
                            name = "name"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {isPending}
                                            placeholder = "Kasongo yeye"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control = {form.control}
                            name = "email"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {isPending}
                                            placeholder = "kasongo@example.com"
                                            type = "email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control = {form.control}
                            name = "password"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>pasword</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled = {isPending}
                                            placeholder = "******"
                                            type = "password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message = {error} />
                    <FormSuccess message = {success} />
                    <Button
                        type="submit"
                        disabled = {isPending}
                        className="w-full"
                    >
                        Register
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}