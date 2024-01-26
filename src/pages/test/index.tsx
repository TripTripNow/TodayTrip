// Test.js

import { useState } from 'react';
import Rating from '@/components/Modal/ReviewModal/Rating/Rating';

function Test() {
  // 상위 컴포넌트에서 관리할 상태인 ratingValue를 useState를 통해 생성하고 초기값을 0으로 설정합니다.
  const [ratingValue, setRatingValue] = useState(0);

  // ratingValue를 변경하는 handleChange 함수를 선언합니다.
  const handleChange = (value) => {
    setRatingValue(value); // setRatingValue를 호출하여 ratingValue의 값을 변경합니다.
  };

  // Rating 컴포넌트를 렌더링하고, 필요한 props를 전달합니다.
  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Rating
        className="RatingInput"
        value={ratingValue} // 상위 컴포넌트에서 관리하는 ratingValue 상태를 전달합니다.
        onSelect={handleChange} // 상위 컴포넌트에서 정의한 handleChange 함수를 onSelect props로 전달합니다.
        onHover={setRatingValue} // ratingValue 상태를 변경하는 setRatingValue 함수를 onHover props로 전달합니다.
        onMouseOut={setRatingValue} // ratingValue 상태를 변경하는 setRatingValue 함수를 onMouseOut props로 전달합니다.
      />
    </div>
  );
}

export default Test;
