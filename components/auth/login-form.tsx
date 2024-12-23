"use client"

import { CardWrapper } from "./card-wrapper";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

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
import { login } from "@/actions/login";

export const LoginForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setsuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setsuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data.error);
                setsuccess(data.success);
            })
        });
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel = "Don't have an account?"
            backButtonHref="/auth/register"
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
                        Login
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}