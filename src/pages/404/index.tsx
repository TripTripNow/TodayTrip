import ErrorPage from '@/components/common/Error/Error';

function NotFound() {
  return <ErrorPage errorStatus={404} />;
}

export default NotFound;
