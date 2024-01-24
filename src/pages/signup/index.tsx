import UserLayout from '@/components/User/UserLayout';
import { ReactElement } from 'react';

function Signup() {
  return (
    <div>
      <div>a</div>
    </div>
  );
}

export default Signup;

Signup.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이신가요?" linkTitle="로그인하기" link="/signin">
    {page}
  </UserLayout>
);
