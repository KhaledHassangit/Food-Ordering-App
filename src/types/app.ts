export interface IOption {
  label: string;
  value: string;
}
export interface IFormField {
  name: string;
  label?: string;
  type:
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "select"
  | "hidden"
  | "textarea";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption;
  id?: string;
  defaultValue?: string;
  readOnly?: boolean;
  onClick?: () => void;
}
export interface IFormFieldsVariables {
  slug: string;
}
