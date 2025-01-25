import { Pages } from '@/app/constants/enumbs';
import FormFields from '@/components/formfields/form-fields';
import { Button } from '@/components/ui/button'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/types/app';
import React from 'react'

function Form() {

  const {getFormFields} = useFormFields({slug:Pages.LOGIN,translations:{}});
  return (
    <form>
      {
        getFormFields().map((field:IFormField) => (
          <div className='mb-3' key={field.name}>
              <FormFields {...field} error={{}}/>
          </div>
        ))
      }
      <Button type='submit' className='w-full mt-3'>
      Login
      </Button>
    </form>
  )
}

export default Form