import React from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { deleteStudent, setUpdateStatusToIdle } from '../slice/StudentSlice'
import { useNavigate } from 'react-router-dom'

const StudentTable = ({ student }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (studentId) => {
    dispatch(deleteStudent(studentId));
  }

  return (
    <>
      <tr>
        <td>{student.name}</td>
        <td>{student.dob}</td>
        <td>{student.gender}</td>
        <td>{student.nrc}</td>
        <td>{student.address}</td>
        <td>
          <Button variant="info" 
          size='sm' 
          onClick={() => {
            dispatch(setUpdateStatusToIdle());
            navigate(`/update/${student.id}`);
          }}>
            <PencilSquare />
          </Button>
          <Button variant="danger" 
          size='sm' 
          onClick={() => deleteHandler(student.id)}>
            <Trash />
          </Button>
        </td>
      </tr>
    </>
  )
}

export default StudentTable