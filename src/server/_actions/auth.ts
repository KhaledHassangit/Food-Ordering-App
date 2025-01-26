"use server"
import { Locale } from "@/i18n.config"
import { db } from "@/lib/prisma"
import getTrans from "@/lib/translation"
import { loginSchema } from "@/validations/auth"
import bcrypt from "bcrypt";

export const login = async (credentials: Record<"email" | "password",
    string> | undefined, locale: Locale) => {
    const translations = await getTrans(locale)
    const result = loginSchema(translations).safeParse(credentials)
    if (!result.success) {
        return {
            error: result.error?.formErrors.fieldErrors,
            status: 400,
        }
    }
    try {
        const user = await db.user.findUnique({
            where: {
                email: credentials?.email
            }
        })
        if (!user) {
            return { message: translations.messages.userNotFound, status: 401 }
        }
        const hashedPassword = user.password;
        const isPasswordMatch = await bcrypt.compare(
            result.data.password,
            hashedPassword
        );
        if (!isPasswordMatch) {
            return {
                message: translations.messages.incorrectPassword,
                status: 401,
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return {
          user: userWithoutPassword,
          status: 200,
          message: translations.messages.loginSuccessful,
        };
    
    }
    
    catch (error) {
        console.log(error)
        return {
            status: 500,
            message: translations.messages.unexpectedError,
        }

    }
}
