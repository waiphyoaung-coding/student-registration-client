import React, { useEffect, useRef, useState } from 'react'
import StudentTable from '../components/StudentTable';
import { useDispatch, useSelector } from 'react-redux';
import { excelExport, excelFileDownload, excelImport, fetchAllStudent, getAllStudents, getFetchStatus, getImportStatus, setImportStatusToIdle } from '../slice/StudentSlice';
import { Button, Col, Container, Form, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { BoxArrowInLeft, BoxArrowRight, Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';
const StudentTablePage = () => {
  const status = useSelector(getFetchStatus);
  const studentList = useSelector(getAllStudents);
  const importStatus = useSelector(getImportStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState(studentList);
  const searchHandler = e => setStudents(studentList.filter(student => student.studentID.toString().includes((e.target.value).toString()) || student.name.toString().toLowerCase().includes((e.target.value).toLowerCase())))

  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);

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
    if(importStatus === 'success'){
      setShow(false)
      dispatch(setImportStatusToIdle())
    }
  },[status,dispatch,importStatus])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalItems = studentList.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
  }

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

  const handleClose = () => {
    setShow(false);
    dispatch(setImportStatusToIdle())
  };
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file)
  };

  const handleImport = () => {
    if(file){
      const formData = new FormData();
      formData.append('file', file);
      dispatch(excelImport(formData));
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }else{
      console.log("imported file is empty.")
    }
  }
  
  const handleExport = async () => {
    dispatch(excelExport())
  };

  const handleDownloadExcelFile = () => {
    dispatch(excelFileDownload())
  }
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
              }<BoxArrowInLeft />
          </Button>
          <Button 
          type='button' 
          variant='primary' 
          className='btn mx-3' 
          onClick={handleExport}>
              {'Export '}
              <BoxArrowRight />
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
                onChange={handleFileChange}
                ref={fileInputRef}/>
              </Form.Group>
              {
                importStatus === 'failed' && 
                <p className="text-danger">
                  make sure fields are valid and try agian.
                </p>
              }
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
              <Button 
              variant="primary" 
              onClick={handleDownloadExcelFile}>
                Download Excel File
              </Button>
              <div className='d-flex justify-content-end'>
              <Button 
              className='mx-3'
              variant="light" 
              onClick={handleClose}>
                Cancel
              </Button>
              <Button 
              variant="primary" 
              onClick={handleImport} 
              disabled={!file}>
                Import
              </Button>
              </div>
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
        <Col 
        sm="2"
        className='d-flex justify-content-end pb-3'>
          <FormControl 
          className='w-50'
          readOnly
          value={`Total-${studentList.length}`}/>
        </Col>
        <Col sm="5" className='d-flex justify-content-between'>
        {
          students?.length > 5 &&
          <>
          <Col sm="2">
            <Form.Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </Form.Select>
          </Col>
          <PaginationComponent 
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={handlePageChange} />
          </>
        }
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default StudentTablePage;