import Input from '@/components/input/Input';
import { FieldValues, useForm } from 'react-hook-form';

function Test() {
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: '',
      email: '',
    },
  });

  const { handleSubmit, control } = methods;

  const handleOnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5rem',
      }}
    >
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        style={{
          width: '80rem',
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
      >
        <Input placeholder="닉네임" type="text" control={control} name="nickName" isRequired={false} label="닉네임" />
        <Input
          state="user"
          placeholder="이메일"
          type="email"
          control={control}
          name="email"
          isRequired={true}
          label="이메일"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Test;
