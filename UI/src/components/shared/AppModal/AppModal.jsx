import React from 'react';
import './AppModal.scss';

import Modal from 'react-modal';
import {RiCloseLine} from 'react-icons/ri';
Modal.setAppElement('#root');

export default ({isOpen, onClose, title, content, footer, headerEndSlot}) => {
  return (
    <div className="modal-container ">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2>{title}</h2>
            <div className="header-end">
              <div className="header-end-slot">{headerEndSlot}</div>
              <div className="close-button-wrapper" onClick={onClose}>
                <RiCloseLine className="close-button" />
              </div>
            </div>
          </div>

          <div className="modal-content">{content}</div>

          <div className="modal-footer">{footer}</div>
        </div>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '15px',
    height: '70%',
    width: '60%',
    padding: '0',
    animation: 'fadein 0.5s',
  },
};
