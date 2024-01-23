import Input from '@/components/input/Input';
import { FieldValues, useForm } from 'react-hook-form';

function Test() {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const { handleSubmit, control } = methods;

  const handleOnSubmit = () => {
    console.log('submit');
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        style={{
          width: '80rem',
        }}
      >
        <Input placeholder="닉네임" type="text" control={control} name="nickName" isRequired={false} label="닉네임" />
      </form>
    </div>
  );
}

export default Test;
