import CancelModal from '@/components/Modal/CancelModal/CancelModal';
import { useState } from 'react';

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleModalToggle}>열기</button>
      {isOpen && <CancelModal handleModalClose={handleModalToggle} handleCancel={handleModalToggle} />}
    </>
  );
}
export default Test;
