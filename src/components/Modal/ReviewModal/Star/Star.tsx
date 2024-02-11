import { Dispatch, SetStateAction } from 'react';
import EmptyStarIcon from '#/icons/icon-emptyStar.svg';
import YellowStarIcon from '#/icons/icon-yellowStar.svg';
import LightYellowStarIcon from '#/icons/icon-lightYellowStar.svg';
import { RATINGS } from '@/constants/ratingArray';

type Rating = (typeof RATINGS)[number];

interface StarProps {
  isSelected: boolean;
  rating: Rating;
  ratingInputValue: number;
  setRatingInputValue: Dispatch<SetStateAction<number>>;
  hoveredStarCount: number;
  setHoveredStarCount: Dispatch<SetStateAction<number>>;
}

function Star({
  isSelected = false,
  rating,
  setRatingInputValue,
  ratingInputValue,
  hoveredStarCount,
  setHoveredStarCount,
}: StarProps) {
  const starIcon = (() => {
    if (isSelected) {
      return <YellowStarIcon alt="선택된 별 아이콘" />;
    }
    if (hoveredStarCount >= rating) {
      return <LightYellowStarIcon alt="호버 된 별 아이콘" />;
    }
    return <EmptyStarIcon alt="선택도 호버도 되지 않은 별 아이콘" />;
  })();

  return (
    <button
      onClick={() => {
        setRatingInputValue(rating);
      }}
      onMouseEnter={() => setHoveredStarCount(rating)}
      onMouseLeave={() => setHoveredStarCount(ratingInputValue)}
    >
      {starIcon}
    </button>
  );
}

export default Star;
