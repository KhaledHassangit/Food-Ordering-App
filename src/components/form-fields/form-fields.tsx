import { InputTypes } from "@/constants/enums";
import TextField from "./text-field";
import PasswordField from "./password-field";
import { IFormField } from "@/types/app";
import Checkbox from "./checkbox";
import { ValidationErrors } from "@/validations/auth";

interface Props extends IFormField {
  error: ValidationErrors;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      // Checkbox component requires explicit `checked` and `name`/`label` props
      return (
        <Checkbox
          name={props.name}
          label={props.label}
          checked={Boolean(props.defaultValue)}
          onClick={props.onClick as any}
        />
      );
    }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
