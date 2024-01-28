import { Dispatch, SetStateAction, useState } from 'react';
import EmptyStarIcon from '#/icons/icon-emptyStar.svg';
import YellowStarIcon from '#/icons/icon-yellowStar.svg';
import { RATINGS } from '@/components/Modal/ReviewModal/ReviewModal';
import LightYellowStarIcon from '#/icons/icon-lightYellowStar.svg';

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
  return (
    <button
      onClick={() => {
        setRatingInputValue(rating);
      }}
      onMouseEnter={() => setHoveredStarCount(rating)}
      onMouseLeave={() => setHoveredStarCount(ratingInputValue)}
    >
      {isSelected ? <YellowStarIcon /> : hoveredStarCount >= rating ? <LightYellowStarIcon /> : <EmptyStarIcon />}
    </button>
  );
}

export default Star;
