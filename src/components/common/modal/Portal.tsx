import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal');

  if (!el) {
    console.error('Modal element not found');
    return null;
  }

  return ReactDOM.createPortal(children, el);
};
