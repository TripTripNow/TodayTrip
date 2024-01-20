import { useEffect } from 'react';

function Home() {
  function factorial(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  useEffect(() => {
    factorial(2);
  }, []);

  return <main></main>;
}

export default Home;
