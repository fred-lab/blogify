import React, { useRef } from 'react';

export default function Modal({ children, close }) {
  const modal = useRef(null);
  const closeModal = (event) => {
    const { target } = event;

    if (target === modal.current) {
      close();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <section className="modal-container" onClick={closeModal} ref={modal}>
      <section className="modal-view">{children}</section>
    </section>
  );
}
