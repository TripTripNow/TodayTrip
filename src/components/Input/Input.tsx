import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import styles from './Input.module.css';
import {
  EMAIL_STANDARD,
  ERROR_EMAIL_CHECK,
  ERROR_EMAIL_EMPTY,
  ERROR_NICKNAME_EMPTY,
  ERROR_NICKNAME_NEW,
  ERROR_PASSWORD_EMPTY,
  ERROR_PASSWORD_SECOND_EMPTY,
  ERROR_PASSWORD_VALIDATION,
} from '@/constants/user';

interface InputProps {
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  type: 'text' | 'email' | 'password';
  state?: 'user' | 'default';
  isAutoFocus?: boolean;
}

// type의 경우 필요에 따라 interface에 추가 후 사용해주세요.
// state는 기본값은 default입니다. user관련 페이지에서 사용할 때 user로 내려주면됩니다.
function Input({ label, placeholder, control, name, type, state = 'default', isAutoFocus = false }: InputProps) {
  const matchInput = authInput.find((input) => input.type === name);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: matchInput?.rule,
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
        onBlur={field.onBlur}
        autoFocus={isAutoFocus}
      />
      {error && <div className={styles.errorMessage}>{error.message}</div>}
    </div>
  );
}

export default Input;

// input에 rule이 필요한 경우 type을 prop으로 넘긴 name 동일, rule 추가 후 사용
const authInput = [
  {
    type: 'email',
    rule: {
      required: ERROR_EMAIL_EMPTY,
      pattern: { value: EMAIL_STANDARD, message: ERROR_EMAIL_CHECK },
    },
  },
  {
    type: 'password',
    rule: {
      required: ERROR_PASSWORD_EMPTY,
      minLength: { value: 8, message: ERROR_PASSWORD_VALIDATION },
    },
  },
  {
    type: 'passwordCheck',
    rule: {
      required: ERROR_PASSWORD_SECOND_EMPTY,
    },
  },
  {
    type: 'nickName',
    rule: {
      required: ERROR_NICKNAME_EMPTY,
      maxLength: { value: 10, message: ERROR_NICKNAME_NEW },
    },
  },
];
