import CancelModal from '@/components/Modal/CancelModal/CancelModal';
import Rating from '@/components/Modal/ReviewModal/Star/Star';
import RatingInput from '@/components/Modal/ReviewModal/RatingInput/RatingInput';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import { useState } from 'react';

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const [ratingValue, setRatingValue] = useState(0);

  const handleChange = (value) => {
    setRatingValue(value);
  };
  return (
    <>
      <ReviewModal />
      {/* <button onClick={handleModalToggle}>열기</button>
      {isOpen && <ReviewModal />} */}
    </>
  );
}
export default Test;
