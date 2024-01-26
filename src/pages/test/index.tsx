import CancelModal from '@/components/Modal/CancelModal/CancelModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import { useState } from 'react';

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ReviewModal />
      <button onClick={handleModalToggle}>열기</button>
      {isOpen && <CancelModal handleModalClose={handleModalToggle} handleCancel={handleModalToggle} />}
    </>
  );
}
export default Test;
