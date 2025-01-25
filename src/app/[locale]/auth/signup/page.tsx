import { Pages, Routes } from '@/app/constants/enumbs';
import { buttonVariants } from '@/components/ui/button'
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import Link from 'next/link'
import React from 'react'
import Form from './_components/Form';

async function SignUpPage() {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);

  return (
    <main>
      <div className="py-44 md:py-40 bg-gray-50 element-center">
        <div className="container element-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              translations.auth.login.title
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>translations.auth.login.authPrompt.message</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                translations.auth.login.authPrompt.signUpLinkText
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage