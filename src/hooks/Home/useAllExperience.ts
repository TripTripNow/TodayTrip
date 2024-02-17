import { useEffect, useState } from 'react';

export const useAllExperience = () => {
  const [move, setMove] = useState(0);
  const [disableLeftShadow, setDisableLeftShadow] = useState(false);
  const [disableRightShadow, setDisableRightShadow] = useState(false);

  const handleDisableShadow = () => {
    setDisableRightShadow(move >= 3);
    setDisableLeftShadow(move !== 0);
  };

  useEffect(() => {
    handleDisableShadow();
  }, [move]);

  return { disableLeftShadow, disableRightShadow, setMove };
};
