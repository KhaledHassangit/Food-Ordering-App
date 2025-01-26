"use client"
import { Pages, Routes } from '@/app/constants/enumbs';
import FormFields from '@/components/formfields/form-fields';
import { Button } from '@/components/ui/button'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/types/app';
import { toast } from '@/hooks/use-toast';
import { Translations } from '@/types/translations';
import Loader from '@/components/ui/Loader';
import { useActionState, useEffect } from 'react';
import { signUp } from '@/server/_actions/auth';
import { ValidationErrors } from '@/validations/auth';
import { useParams, useRouter } from "next/navigation";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
}; 

function Form({translations}:{translations:Translations}) {
  const { locale } = useParams();
  const router = useRouter();

  const [state,action,pending] = useActionState(signUp,initialState)
  const { getFormFields } = useFormFields({ slug: Pages.Register, translations: translations });

  useEffect(() => {
    if (state.status && state.message) {
      toast({
        title: state.message,
        className: state.status === 201 ? "text-green-400" : "text-destructive",
      });
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, router, state.message, state.status]);

  return (
    <form action={action} >
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string;
        return (
          <div className='mb-3' key={field.name}>
            <FormFields {...field} error={state.error} defaultValue={fieldValue} />
          </div>
        );
      })}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  )
}

export default Form