import Link from 'next/link';

interface userDataProps {
  userData: {
    name: string;
  };
}

function Navbar({ userData }: userDataProps) {
  return (
    <div className="border border-solid border-black text-black w-full h-8 flex justify-around items-center">
      <Link href="/">
        <div>asdf</div>
      </Link>
      <div></div>
      <div className="flex gap-6 text-sm">
        {userData ? (
          <>
            <div>img</div>
            <div className="border"></div>
            <div>{userData.name}</div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <div>로그인</div>
            </Link>
            <Link href="/signup">
              <div>회원가입</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
