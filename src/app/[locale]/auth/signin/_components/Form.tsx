"use client"
import { Pages, Routes } from '@/app/constants/enumbs';
import FormFields from '@/components/formfields/form-fields';
import { Button } from '@/components/ui/button'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/types/app';
import React, { useRef, useState } from 'react'
import { signIn } from "next-auth/react"
import { toast } from '@/hooks/use-toast';
import { Translations } from '@/types/translations';
import Loader from '@/components/ui/Loader';
import { useParams, useRouter } from "next/navigation";

function Form({translations}:{translations:Translations}) {
  const router = useRouter();
  const { locale } = useParams();

  const { getFormFields } = useFormFields({ slug: Pages.LOGIN, translations: translations });
  const formRef = useRef<HTMLFormElement>(null)
  const [error,setError] = useState({})
  const [loading,setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!formRef.current) return;
    const formData = new FormData(formRef.current)
    const data :Record<string,string> = {}
    formData.forEach((value,key) =>{
      data[key] = value as string
    })
    try {
      setLoading(true)
      const res = await  signIn("credentials", {
        email:data.email,
        password:data.password,
        redirect: false,
      })
      if(res?.error){
        const validationError = JSON.parse(res?.error).validationError
        setError(validationError)
        const responseError = JSON.parse(res?.error).responseError
        if(responseError){
          toast({title:responseError,
            className:"text-destructive",
          })
        }
      }
      if(res?.ok){
        toast({title:translations.messages.loginSuccessful,
          className:"text-green-400",
        })
        router.replace(`/${locale}/${Routes.PROFILE}`);

      }
    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      {
        getFormFields().map((field: IFormField) => (
          <div className='mb-3' key={field.name}>
            <FormFields {...field} error={error} />
          </div>
        ))
      }
      <Button type='submit' disabled={loading} className='w-full mt-3'>
        {loading ? <Loader/> : translations.auth.login.submit }
      </Button>
    </form>
  )
}

export default Form