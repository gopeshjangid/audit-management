import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmBox = (props) => {
  const {
    className,
    isOpen,
    toggle,
    handleOk,
    heading,
    content
  } = props;


  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        {heading && <ModalHeader toggle={toggle}>{heading}</ModalHeader>}
        <ModalBody>
            {content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOk}>Ok</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmBox;
