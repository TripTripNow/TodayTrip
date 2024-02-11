import { ReactNode, useEffect, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalLayout.module.css';
import useBodyScrollLock from '@/hooks/common/useBodyScrollLock';

interface ModalLayoutProps {
  children: ReactNode;
  handleModalClose: () => void;
  isAlarmModal?: boolean;
}

function ModalLayout({ children, handleModalClose, isAlarmModal }: ModalLayoutProps) {
  const portalRoot = document.getElementById('modal') as HTMLElement;
  const { lockScroll, openScroll } = useBodyScrollLock();

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
    lockScroll();

    // handleModalClose에 변화가 생길 떄 즉, 다른 모달이 뜰 때 기존 이벤트 리스너 제거
    return () => {
      openScroll();
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleModalClose]);

  return createPortal(
    <div
      onClick={modalOutsideClick}
      ref={modalOutsideRef}
      className={`${styles.root} ${isAlarmModal && styles.alarmModal}`}
    >
      {children}
    </div>,
    portalRoot,
  );
}

export default ModalLayout;
