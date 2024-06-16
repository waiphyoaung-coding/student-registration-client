import React, { useEffect, useState } from 'react'
import StudentTable from '../components/StudentTable';
import { useDispatch, useSelector } from 'react-redux';
import { excelExport, excelImport, fetchAllStudent, getAllStudents, getFetchStatus, getImportStatus } from '../slice/StudentSlice';
import { Button, Col, Container, Form, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { Download, Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';
const StudentTablePage = () => {
  const status = useSelector(getFetchStatus);
  const studentList = useSelector(getAllStudents);
  const importStatus = useSelector(getImportStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState(studentList);
  const searchHandler = e => setStudents(studentList.filter(student => student.studentID.toString().includes(e.target.value) || student.name.toString().toLowerCase().includes((e.target.value).toLowerCase())))

  useEffect(()=>{
    dispatch(fetchAllStudent())
  },[dispatch])
  useEffect(() => {
    setStudents(studentList);
  }, [studentList]);
  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchAllStudent())
    }
  },[status,dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = studentList.length; 
  const itemsPerPage = 5; 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let content;
  if(status === "loading"){
    content = (
      <tr>
        <td colSpan={6} className='text-center'>Loading.....</td>
      </tr>
    )
  }
  if(status === "success"){
    content = (
      students.length <= 0 ? 
        <tr>
          <td colSpan={6} className='text-center'>No Data Found!</td>
        </tr>
        :
      students.slice(itemsPerPage*(currentPage-1),(itemsPerPage*currentPage)).map(student => 
        <StudentTable key={student.id} student={student} />
      )
    )
  }
  if(status === "failed"){
    content = "Failed to Fetch!!"
  }

  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImport = () => {
    if(file){
      const formData = new FormData();
      formData.append('file', file);
      dispatch(excelImport(formData));
      setShow(false)
    }else{
      console.log("imported file is empty.")
    }
  }
  
  const handleExport = async () => {
    dispatch(excelExport())
  };
  return (
    <>
    <Container>
      <Row className='d-flex justify-content-between mt-5'>
        <Col sm="4">
          <InputGroup className="mb-3">
            <Form.Control
              type='search'
              placeholder="Search"
              aria-describedby="search-btn"
              onChange={searchHandler}
            />
          </InputGroup>
        </Col>
        <Col sm="5" className='d-flex justify-content-end py-2'>
          <Button 
          type='button' 
          variant='primary' 
          className='btn' 
          onClick={handleShow}>
              {
                importStatus === 'loading'?
                "Loading..." :
                'Import ' 
              }<Download />
          </Button>
          <Button 
          type='button' 
          variant='primary' 
          className='btn mx-3' 
          onClick={handleExport}>
              Export <Download />
          </Button>
          <Button variant='primary' 
          onClick={() => {navigate(`/create`)}}>
            New <Plus />
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header 
            closeButton
            className='bg-primary text-light'>
              <Modal.Title>
                Excel File Import
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>
                  Enter Excel File
                </Form.Label>
                <Form.Control 
                type='file' 
                onChange={handleFileChange}/>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button 
              variant="secondary" 
              onClick={handleClose}>
                Close
              </Button>
              <Button 
              variant="primary" 
              onClick={handleImport} 
              disabled={!file}>
                Import
              </Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
              <tr>
                <th className='bg-primary text-light py-3'>StudentID</th>
                <th className='bg-primary text-light py-3'>Name</th>
                <th className='bg-primary text-light py-3'>NRC</th>
                <th className='bg-primary text-light py-3'>DateOfBirth</th>
                <th className='bg-primary text-light py-3'>Address</th>
                <th className='bg-primary text-light py-3'>Action</th>
              </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </Row>
      <Row className='d-flex justify-content-end py-5'>
        <Col sm="6" className='d-flex justify-content-end'>
        {
          students?.length > 5 &&
          <PaginationComponent 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={handlePageChange} />
        }
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default StudentTablePage;