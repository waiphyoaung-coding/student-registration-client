import React, { useEffect, useState } from 'react'
import classes from './StudentTablePage.module.css';
import StudentTable from '../components/StudentTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudent, getAllStudents, getFetchStatus } from '../slice/StudentSlice';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const StudentTablePage = () => {
  const status = useSelector(getFetchStatus);
  const studentList = useSelector(getAllStudents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState();
  const searchHandler = e => setStudents(studentList.filter(student => student.studentID.toString().includes(e.target.value) || student.name.toString().includes(e.target.value)))

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchAllStudent())
    }
  },[status,dispatch])
  useEffect(() => {
    setStudents(studentList);
  }, [studentList]);

  let content;
  if(status === "loading"){
    content = (
      <tr>
        <td>Loading.....</td>
      </tr>
    )
  }
  if(status === "success"){
    content = (
      students.length <= 0 ? 
        <tr>
          <td>No Data Found!</td>
        </tr>
        :
      students.map(student => 
        <StudentTable student={student} />
      )
    )
  }
  if(status === "failed"){
    content = "Failed to Fetch!!"
  }

  return (
    <>
    <Container>
      <Row className='d-flex justify-content-between my-3'>
        <Col sm="2">
          <Button variant='info' 
          onClick={() => {navigate(`/create`)}}>
            New <Plus />
          </Button>
        </Col>
        <Col sm="5">
          <InputGroup className="mb-3">
            <Form.Control
              type='search'
              placeholder="Search"
              aria-describedby="search-btn"
              onChange={searchHandler}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <table className={classes.table}>
          <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">DateOfBirth</th>
                <th scope="col">Gender</th>
                <th scope="col">NRC</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </Row>
    </Container>
    </>
  );
}

export default StudentTablePage;