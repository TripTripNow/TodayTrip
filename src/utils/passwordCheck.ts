import { FieldValues, UseFormSetError } from 'react-hook-form';

export const passwordCheck = (password: string, passwordCheck: string, setError: UseFormSetError<FieldValues>) => {
  if (passwordCheck !== password) {
    console.log('in');
    setError('mypagePasswordCheck', {
      type: 'validate',
      message: '비밀번호가 일치하지 않습니다.',
    });
    return false;
  }
  return true;
};
