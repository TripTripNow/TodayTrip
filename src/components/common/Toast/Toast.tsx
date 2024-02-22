import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

function Toast() {
  const portalRoot = document.getElementById('toast') as HTMLElement;

  return createPortal(
    <div>
      <Toaster containerStyle={{ fontSize: '2.5rem', fontWeight: '600' }} />
    </div>,
    portalRoot,
  );
}

export default Toast;
