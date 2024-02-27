import ErrorPage from '@/components/common/Error/Error';

function ServerError() {
  return <ErrorPage errorStatus={500} />;
}

export default ServerError;
