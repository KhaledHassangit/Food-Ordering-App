import { Pages } from "@/app/constants/enumbs";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/translations";

interface Props extends IFormFieldsVariables {
    translations: Translations;
}


const useFormFields = ({ slug, translations }: Props) => {
    const loginInputs = (): IFormField[] => [
        {
            label: translations.auth.login.email.label,
            name: "email",
            type: "email",
            placeholder: translations.auth.login.email.placeholder,
            autoFocus: true,
        },
        {
            label: translations.auth.login.password.label,
            name: "password",
            placeholder: translations.auth.login.password.placeholder,
            type: "password",
        },
    ];
    const getFormFields = (): IFormField[] => {
        switch (slug) {
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