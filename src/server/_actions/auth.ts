"use server"
import { Locale } from "@/i18n.config"
import { db } from "@/lib/prisma"
import getTrans from "@/lib/translation"
import { loginSchema } from "@/validations/auth"

export const login = async(credentials: Record<"email" | "password",
     string> | undefined, locale: Locale) => {
        const translations = await getTrans(locale)
        const result = loginSchema(translations).safeParse(credentials)
        if(!result.success){
            return {
                error:result.error?.formErrors.fieldErrors,
                status:400,
            }
        }
        try{
             const user = await db.user.findUnique({
                where:{
                    email:credentials?.email
                } 
            })
            if(!user){
                return {message:translations.messages.userNotFound,status:401}
            }
            
        }catch(error){
            console.log(error)
            return {
                status:500,
                message:translations.messages.unexpectedError,
            }

        }
}
