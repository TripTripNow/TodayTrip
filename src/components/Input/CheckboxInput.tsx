import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import styles from './Checkbox.module.css';

interface CheckboxInputProps {
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
}

function CheckboxInput({ control, name }: CheckboxInputProps) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <label className={styles.checkboxInput} htmlFor={field.name}>
      <input type="checkbox" id={field.name} name={field.name} value={field.value} onChange={field.onChange} />
      비밀번호 표시
    </label>
  );
}

export default CheckboxInput;
