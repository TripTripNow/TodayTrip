import { Dispatch, SetStateAction } from 'react';
import EmptyStarIcon from '#/icons/icon-emptyStar.svg';
import YellowStarIcon from '#/icons/icon-yellowStar.svg';
import { RATINGS } from '@/components/Modal/ReviewModal/ReviewModal';

type Rating = (typeof RATINGS)[number];

interface StarProps {
  isSelected: boolean;
  rating: Rating;
  setRatingInputValue: Dispatch<SetStateAction<number>>;
}

function Star({ isSelected = false, rating, setRatingInputValue }: StarProps) {
  return (
    <button onClick={() => setRatingInputValue(rating)} onMouseOver={() => setRatingInputValue(rating)}>
      {isSelected ? <YellowStarIcon /> : <EmptyStarIcon />}
    </button>
  );
}

export default Star;
