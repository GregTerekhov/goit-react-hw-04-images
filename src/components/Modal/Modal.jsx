import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleModalClose);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleModalClose);
      document.body.style.overflow = 'auto';
    };
  });

  const handleModalClose = event => {
    if (event.currentTarget === event.target || event.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleModalClose}>
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
