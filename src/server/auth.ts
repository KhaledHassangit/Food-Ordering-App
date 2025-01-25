import { Environments, Pages, Routes } from "@/app/constants/enumbs";
import { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma";
export const authOptions:NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: {
                    lable: "Password",
                    type: "password",
                },
            },
            authorize: (credentials) => {
                const user = credentials;
                return {
                    id: crypto.randomUUID(),
                    ...user,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 Days
        updateAge:  24 * 60 * 60, // 24 Hours
    },
    debug:process.env.NODE_ENV === Environments.DEV,
    adapter:PrismaAdapter(db),
    pages:{
        signIn:`/${Routes.AUTH}/${Pages.LOGIN}`
    }
}