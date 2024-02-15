import { useEffect, useState } from 'react';

export const useAllExperience = () => {
  const [move, setMove] = useState(0);

  const handleDisableShadow = () => {
    const disableShadow = move !== 0;
    const disableRightShadow = move >= 3;
    return { disableShadow, disableRightShadow };
  };

  useEffect(() => {
    handleDisableShadow();
  }, [move]);

  return { setMove, handleDisableShadow };
};
