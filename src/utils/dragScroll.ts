const isTouchScreen = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const dragScroll = ({
  onDragChange,
  onDragEnd,
  stopPropagation,
}: {
  onDragChange?: (deltaX: number) => void;
  onDragEnd?: (deltaX: number) => void;
  stopPropagation?: boolean;
}) => {
  if (isTouchScreen) {
    return {
      onTouchStart: (touchEvent: React.TouchEvent<HTMLDivElement>) => {
        if (stopPropagation) touchEvent.stopPropagation();

        const touchMoveHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();

          onDragChange?.(moveEvent.touches[0].pageX - touchEvent.touches[0].pageX);
        };

        const touchEndHandler = (moveEvent: TouchEvent) => {
          onDragEnd?.(moveEvent.changedTouches[0].pageX - touchEvent.changedTouches[0].pageX);
          document.removeEventListener('touchmove', touchMoveHandler);
        };

        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
        document.addEventListener('touchend', touchEndHandler, { once: true });
      },
    };
  }

  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (stopPropagation) clickEvent.stopPropagation();

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        onDragChange?.(moveEvent.pageX - clickEvent.pageX);
        console.log(moveEvent.pageX - clickEvent.pageX);
      };

      const mouseUpHandler = (moveEvent: MouseEvent) => {
        onDragEnd?.(moveEvent.pageX - clickEvent.pageX);
        document.removeEventListener('mousemove', mouseMoveHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    },
  };
};

export default dragScroll;
