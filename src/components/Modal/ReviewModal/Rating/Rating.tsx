// Rating.js

import { useState } from 'react';
import clsx from 'clsx';
import styles from './Rating.module.css';

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating = 0, onSelect, onHover }) {
  // 선택된 별의 스타일과 선택되지 않은 별의 스타일을 설정합니다.
  const className = selected ? clsx(styles.Rating_star, styles.selected) : styles.Rating_star;

  // 별을 렌더링하고 클릭 및 마우스 오버 이벤트에 따라 onSelect 및 onHover 함수를 호출합니다.
  return (
    <span
      className={className}
      onClick={() => onSelect(rating)} // 별을 클릭하면 onSelect 함수에 해당 별의 rating 값을 전달합니다.
      onMouseOver={() => onHover(rating)} // 별에 마우스를 올리면 onHover 함수에 해당 별의 rating 값을 전달합니다.
      role="button"
    >
      ★
    </span>
  );
}

function Rating({ className = '', value = 0, onSelect, onHover, onMouseOut }) {
  // hoverValue 상태를 useState를 통해 생성하고 초기값을 0으로 설정합니다.
  const [hoverValue, setHoverValue] = useState(0);

  // 별 평점을 나타내는 Rating 컴포넌트를 렌더링합니다.
  return (
    <div className={className} onMouseOut={() => onMouseOut(hoverValue)}>
      {/* RATINGS 배열을 순회하면서 각 별을 렌더링하고, 필요한 props를 전달합니다. */}
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating} // 현재 선택된 별의 값(value)이 해당 별의 값(rating)보다 크거나 같으면 true를 전달합니다.
          rating={rating} // 각 별의 값(rating)을 전달합니다.
          onSelect={onSelect} // Test 컴포넌트에서 전달한 onSelect 함수를 전달합니다.
          onHover={(value) => {
            // 해당 별에 마우스를 올렸을 때 hoverValue 상태를 업데이트하고, Test 컴포넌트에서 전달한 onHover 함수를 호출합니다.
            setHoverValue(value); // hoverValue 상태를 해당 별의 값(value)으로 업데이트합니다.
            onHover(value); // Test 컴포넌트에서 전달한 onHover 함수를 호출하여 hoverValue 상태를 업데이트합니다.
          }}
        />
      ))}
    </div>
  );
}

export default Rating;
