import { ReactNode, useEffect, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalLayout.module.css';

interface ModalLayoutProp {
  children: ReactNode;

  handleModalClose: () => void;
}

function ModalLayout({ children, handleModalClose }: ModalLayoutProp) {
  const portalRoot = document.getElementById('modal') as HTMLElement;

  const modalOutsideRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 부분 클릭 시 모달 닫히는 기능
  const modalOutsideClick = (e: MouseEvent) => {
    if (modalOutsideRef.current === e.target) {
      handleModalClose();
    }
  };

  // esc 키 누르면 모달 닫히는 기능
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleEscape);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleModalClose]);

  return createPortal(
    <div onClick={modalOutsideClick} ref={modalOutsideRef} className={styles.root}>
      <div>{children}</div>
    </div>,
    portalRoot,
  );
}

export default ModalLayout;
