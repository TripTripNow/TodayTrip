// Rating.js

import clsx from 'clsx';
import styles from './Rating.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

const RATINGS = [1, 2, 3, 4, 5];
type Rating = (typeof RATINGS)[number];

interface StarProps {
  selected: boolean;
  rating: Rating;
  setValue: Dispatch<SetStateAction<number>>;
}

function Star({ selected = false, rating = 0, setValue }: StarProps) {
  const className = clsx(styles.star, {
    [styles.selected]: selected, // 선택된 경우 selected 클래스를 추가합니다.
  });

  return (
    <button className={className} onClick={() => setValue(rating)} onMouseOver={() => setValue(rating)}>
      ★
    </button>
  );
}

function Rating() {
  const [value, setValue] = useState(0);
  return (
    <>
      {RATINGS.map((rating) => (
        <Star key={rating} selected={value >= rating} rating={rating} setValue={setValue} />
      ))}
    </>
  );
}

export default Rating;
