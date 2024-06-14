import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteStudent } from '../slice/StudentSlice';

const ModalComponent = ({ show, message, studentId, handleClose }) => {
    const dispatch = useDispatch()
  const handleDelet = () => dispatch(deleteStudent(studentId));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-primary text-light' closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>Delete Student-ID : {message}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelet}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;