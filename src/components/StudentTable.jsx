import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { setUpdateStatusToIdle } from '../slice/StudentSlice'
import { useNavigate } from 'react-router-dom'
import ModalComponent from './ModalComponent'

const StudentTable = ({ student }) => {
  const [ show, setShow ] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerUpdate = () => {
    dispatch(setUpdateStatusToIdle());
    navigate(`/update/${student.id}`);
  }

  return (
    <>
      <tr>
        <th onClick={() => handlerUpdate()}>{student.studentID}</th>
        <td onClick={() => handlerUpdate()}>{student.name}</td>
        <td onClick={() => handlerUpdate()}>{student.nrc}</td>
        <td onClick={() => handlerUpdate()}>{student.dob}</td>
        <td onClick={() => handlerUpdate()}>{student.address}</td>
        <td className='d-flex justify-content-evenly'>
          <Button variant="primary" 
          size='sm' 
          onClick={() => handlerUpdate()}>
            <PencilSquare />
          </Button>
          <Button variant="danger" 
          size='sm' 
          onClick={() => setShow(true)}>
            <Trash />
          </Button>
        </td>
      </tr>
      <ModalComponent
        show={show}
        message={student.studentID}
        studentId={student.id}
        handleClose={() => setShow(false)}
      />
    </>
  )
}

export default StudentTable