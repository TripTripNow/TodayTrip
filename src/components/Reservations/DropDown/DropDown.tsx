import { useState } from 'react';

function DropDown() {
  return (
    <ul>
      {['예약 완료', '예약 취소', '예약 승인', '예약 거절', '체험 완료'].map((li, i) => (
        <li
          style={{
            zIndex: '1',
            display: 'flex',
            width: '5rem',
            height: '3rem',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          key={i}
        >
          {li}
        </li>
      ))}
    </ul>
  );
}

export default DropDown;
