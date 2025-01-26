import { Environments, Pages, Routes } from "@/app/constants/enumbs";
import { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n.config";

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
            authorize: async(credentials,req) => {
                const currentUrl = req?.headers?.referer;
                const locale = currentUrl?.split("/")[3] as Locale;
                const response = await login(credentials,locale)
                if (response.status === 200 && response.user) {
                    return response.user;
                } else {
                    throw new Error(
                        JSON.stringify({
                            validationError: response.error,
                            responseError: response.message,
                        })
                    );
                }
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