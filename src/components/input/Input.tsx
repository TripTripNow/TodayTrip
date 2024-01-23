import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import Style from './Input.module.css';

interface InputProps {
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  type: 'text' | 'email' | 'password';
  isRequired: boolean;
}

function Input({ label, placeholder, control, name, type, isRequired }: InputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: isRequired
      ? {
          required: { value: true, message: '필수 값입니다.' },
        }
      : {},
  });

  return (
    <div className={Style.inputContainer}>
      <label className={Style.label}>{label}</label>
      <input
        className={Style.input}
        placeholder={placeholder}
        type={type}
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
      />
      {error && <div className={Style.errorMessage}>{error.message}</div>}
    </div>
  );
}

export default Input;
