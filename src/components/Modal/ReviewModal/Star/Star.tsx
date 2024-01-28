import { Dispatch, SetStateAction, useState } from 'react';
import EmptyStarIcon from '#/icons/icon-emptyStar.svg';
import YellowStarIcon from '#/icons/icon-yellowStar.svg';
import { RATINGS } from '@/components/Modal/ReviewModal/ReviewModal';
import LightYellowStarIcon from '#/icons/icon-lightYellowStar.svg';
type Rating = (typeof RATINGS)[number];

interface StarProps {
  isSelected: boolean;
  rating: Rating;
  setRatingInputValue: Dispatch<SetStateAction<number>>;
  ratingInputValue: number;
  setHoverValue: Dispatch<SetStateAction<number>>;
  hoverValue: number;
}

function Star({
  isSelected = false,
  rating,
  setRatingInputValue,
  ratingInputValue,
  setHoverValue,
  hoverValue,
}: StarProps) {
  return (
    <button
      onClick={() => {
        setRatingInputValue(rating);
      }}
      onMouseEnter={() => setHoverValue(rating)}
      onMouseLeave={() => setHoverValue(ratingInputValue)}
    >
      {isSelected ? <YellowStarIcon /> : hoverValue >= rating ? <LightYellowStarIcon /> : <EmptyStarIcon />}
    </button>
  );

  //   return (
  //     <button onClick={() => setRatingInputValue(rating)} onMouseOver={() => setRatingInputValue(rating)}>
  //       {isSelected ? <YellowStarIcon /> : <EmptyStarIcon />}
  //     </button>
  //   );
  // }
}

export default Star;
