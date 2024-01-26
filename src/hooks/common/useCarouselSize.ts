import { useEffect, useRef, useState } from 'react';

interface useCarouselSizeProps {
  initWidth?: number;
}

const useCarouselSize = (
  { initWidth = 0 }: useCarouselSizeProps = {
    initWidth: 0,
  },
) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setCarouselSize] = useState(initWidth);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carouselRect = carouselRef.current.getBoundingClientRect();
    setCarouselSize(carouselRect.width);
  }, [carouselRef]);

  return {
    ref: carouselRef,
    width,
  };
};

export default useCarouselSize;
