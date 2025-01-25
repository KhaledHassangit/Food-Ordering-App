import { Pages } from "@/app/constants/enumbs";
import { IFormField, IFormFieldsVariables } from "@/types/app";

interface Props extends IFormFieldsVariables {
    translations:any;
}


const useFormFields = ({slug,translations}:Props) =>{
    const loginInputs = ():IFormField[] =>[
        {
            label:"Email",
            name:"email",
            type:"email",
            placeholder:"Enter your email",
            autoFocus:true,
        },
        {
            label:"Password",
            name:"password",
            type:"password",
            placeholder:"Enter your password",
        },
    ]
    const getFormFields = ():IFormField[] =>{
        switch(slug){
            case Pages.LOGIN:
                return loginInputs();
            default:
                return [];
        }
    }
    return {
        getFormFields,
    };
};

export default useFormFields;