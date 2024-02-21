import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const withAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/signin';

    return NextResponse.redirect(url);
  }
};

const withOutAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl.clone();

  if (token) {
    url.pathname = '/';

    return NextResponse.redirect(url);
  }
};

const withAuthList = '/mypage';
const withOutAuthList = ['/signin', '/signup'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  const isWithAuth = pathname.startsWith(withAuthList);
  const isWithOutAuth = withOutAuthList.includes(pathname);

  if (isWithAuth) {
    return withAuth(req, !!token);
  }
  if (isWithOutAuth) {
    return withOutAuth(req, !!token);
  }
}
