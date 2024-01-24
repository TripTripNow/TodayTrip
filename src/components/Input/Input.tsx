import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  type: 'text' | 'email' | 'password';
  isRequired: boolean;
  state?: 'user' | 'default';
}

// type의 경우 필요에 따라 interface에 추가 후 사용해주세요.
// isRequired는 필수값인 경우 true로 넘겨주세요. 만약 값이 입력되지 않는다면 '필수 값입니다.' 에러메세지가 나옵니다.
// state는 기본값은 default입니다. user관련 페이지에서 사용할 때 user로 내려주면됩니다.
function Input({ label, placeholder, control, name, type, isRequired, state = 'default' }: InputProps) {
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
    <div className={`${state === 'default' ? styles.inputContainer : styles.userInputContainer} `}>
      <label className={styles.label} htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error && styles.errorInput}`}
        placeholder={placeholder}
        type={type}
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
      />
      {error && <div className={styles.errorMessage}>{error.message}</div>}
    </div>
  );
}

export default Input;
