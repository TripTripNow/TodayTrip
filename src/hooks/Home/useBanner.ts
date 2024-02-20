import { useEffect, useRef, useState } from 'react';
import { BANNER } from '@/components/Home/Banner/Banner';

export const useBanner = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [mouseOnSlider, setMouseOnSlider] = useState(false);
  const [arrowHover, setArrowHover] = useState({ left: false, right: false });

  const slideRef = useRef<HTMLDivElement>(null);
  let slideTimer: NodeJS.Timeout | undefined;

  // 화살표 버튼을 통한 slide 함수
  const handleSlide = (num: number) => {
    setSlideIndex((prev) => (prev + num + BANNER.length) % BANNER.length);
  };

  // 캐러셀 자동 넘기기 함수
  const handleSlideAuto = () => {
    if (!mouseOnSlider) {
      slideTimer = setTimeout(() => {
        handleSlide(1);
      }, 5000);
    } else {
      clearTimeout(slideTimer);
    }
  };

  const handleMouseOnSlider = (bool: boolean) => {
    setMouseOnSlider(bool);
  };

  const handleArrowHover = (direction: string, bool: boolean) => {
    setArrowHover((prev) => ({ ...prev, [direction]: bool }));
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    handleSlideAuto();

    return () => clearTimeout(slideTimer);
  }, [slideIndex, mouseOnSlider]);

  return { handleMouseOnSlider, slideRef, handleSlide, handleArrowHover, arrowHover };
};
