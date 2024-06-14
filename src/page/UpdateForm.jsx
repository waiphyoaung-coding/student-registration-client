import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getStudentById, getUpdateStatus, updateStudent } from '../slice/StudentSlice'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Plus, Trash } from 'react-bootstrap-icons'

const UpdateForm = () => {
  const { studentId } = useParams()
  const student = useSelector(state => getStudentById(state,studentId))
  const status = useSelector(getUpdateStatus)

  const [studentID, setStudentID] = useState(student?.studentID)
  const [name, setName] = useState(student?.name)
  const [nrc, setNRC] = useState(student?.nrc)
  const [dob, setDOB] = useState(student?.dob)
  const [email, setEmail] = useState(student?.email)
  const [address, setAddress] = useState(student?.address)
  const [gender, setGender] = useState(student?.gender)
  const [state, setState] = useState(student?.state)
  const [phonenumber, setPhoneNumber] = useState(student?.phonenumber)
  const [hobby, setHobby] = useState(student?.hobby)
  const [reports, setReports] = useState([...student?.reports])
      
  const dispatch = useDispatch();
  const canCreate = [studentID,name,nrc,dob,email,address,gender,state,phonenumber,hobby].every(Boolean)

  const idInputHandler = e => setStudentID(e.target.value)
  const nameInputHandler = e => setName(e.target.value)
  const nrcInputHandler = e => setNRC(e.target.value)
  const dobInputHandler = e => setDOB(e.target.value)
  const emailInputHandler = e => setEmail(e.target.value)
  const addressInputHandler = e => setAddress(e.target.value)
  const genderInputHandler = e => setGender(e.target.value)
  const stateInputHandler = e => setState(e.target.value)
  const phoneNumberInputHandler = e => setPhoneNumber(e.target.value)
  const hobbyInputHandler = e => {
      const { value, checked } = e.target;
      if(checked){
          setHobby([...hobby,value])
      }else{
          setHobby(hobby.filter(h => h !== value))
      }
  }

  const addNew = () => {
      setReports(
          [...reports,
              {
                  academicYear:0,
                  myanmar:0,
                  english:0,
                  mathematic:0,
                  history:0,
                  science:0,
                  total:0
              }
          ]
      )
  }

  const handleReportChange = (index, field, value) => {
    const newReports = [...reports];
    newReports[index] = { ...newReports[index], [field]: value };
    setReports(newReports); 
};
  
  const removeReport = (index) => {
      const newReports = reports.filter((_, i) => i !== index);
      setReports(newReports);
  };

  const onSubmit = (event) => {
      event.preventDefault()
      if(canCreate){
        const student = {
          id : studentId,
          studentID,
          name,
          nrc,
          dob,
          email,
          address,
          gender,
          state,
          phonenumber,
          hobby,
          reports
        }
        dispatch(updateStudent(student))
      }
  }

  
  return(
      <Container className='px-5'>
          <Form onSubmit={onSubmit}>
              <Row sm={1} md={2} className="mt-5 mb-5 d-flex justify-content-evenly">
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="IdInput">Student ID : </Form.Label>
                          <Form.Control value={studentID} onChange={idInputHandler} className="w-50 me-5" type="text" placeholder="Enter ID"></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="DOBInput">Date Of Birth : </Form.Label>
                          <Form.Control value={dob} onChange={dobInputHandler} className="w-50 me-5" type="date" max={new Date().toISOString().split("T")[0]} placeholder="Enter Date"></Form.Control>
                      </Form.Group>
                  </Col>
              </Row>
              <Row sm={1} md={2} className="mb-5 d-flex justify-content-evenly">
                  <Col sm="10" md="5">
                  <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="NameInput">Student Name : </Form.Label>
                          <Form.Control value={name} onChange={nameInputHandler} className="w-50 me-5" type="text" placeholder="Enter Name"></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="NameInput">Choose Gender : </Form.Label>
                          <div className="w-50 me-5 d-flex justify-content-evenly">
                          <Form.Check
                              inline
                              label="Male"
                              name="group1"
                              type="radio"
                              id="male-1"
                              value="MALE"
                              onChange={genderInputHandler}
                              checked={student.gender === "MALE"}
                          />
                          <Form.Check
                              inline
                              label="Female"
                              name="group1"
                              type="radio"
                              id="female-2"
                              value="FEMALE"
                              onChange={genderInputHandler}
                              checked={student.gender === "FEMALE"}
                          />
                          </div>
                      </Form.Group>
                  </Col>
              </Row>
              <Row sm={1} md={2} className="mb-5 d-flex justify-content-evenly">
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="NRCInput">Student NRC : </Form.Label>
                          <Form.Control value={nrc} onChange={nrcInputHandler} className="w-50 me-5" type="text" placeholder="Enter NRC"></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="stateInput">State/Division : </Form.Label>
                          <Form.Select value={state} onChange={stateInputHandler} className="w-50 me-5" aria-label="states-selection">
                              <option value="MAGWAY">MAGWAY</option>
                              <option value="CHIN">CHIN</option>
                              <option value="KACHIN">KACHIN</option>
                              <option value="SAGAING">SAGAING</option>
                              <option value="TANINTHARYI">TANINTHARYI</option>
                              <option value="MANDALAY">MANDALAY</option>
                              <option value="RAKHINE">RAKHINE</option>
                              <option value="KAYAH">KAYAH</option>
                              <option value="SHAN">SHAN</option>
                              <option value="MON">MON</option>
                              <option value="AYEYARWADDY">AYEYARWADDY</option>
                              <option value="KAYIN">KAYIN</option>
                              <option value="YANGON">YANGON</option>
                              <option value="NAYPYIDAW">NAYPYIDAW</option>
                          </Form.Select>
                      </Form.Group>
                  </Col>
              </Row>
              <Row sm={1} md={2} className="mb-5 d-flex justify-content-evenly">
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="emailInput">Email : </Form.Label>
                          <Form.Control value={email} onChange={emailInputHandler} className="w-50 me-5" type="email" placeholder="Enter Email"></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="phoneInput">PhoneNumber : </Form.Label>
                          <Form.Control value={phonenumber} onChange={phoneNumberInputHandler} className="w-50 me-5" type="tel" min={0} maxLength={11} placeholder="Enter Phone Number"></Form.Control>
                      </Form.Group>
                  </Col>
              </Row>
              <Row sm={1} md={2} className="mb-5 d-flex justify-content-evenly">
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="addressInput">Address : </Form.Label>
                          <Form.Control value={address} onChange={addressInputHandler} className="w-50 me-5" as="textarea" rows={2} placeholder="Enter Address"></Form.Control>
                      </Form.Group>
                  </Col>
                  <Col sm="10" md="5">
                      <Form.Group className="d-flex justify-content-between">
                          <Form.Label control-id="HobbyInput">Choose Hobby : </Form.Label>
                          <div className="w-50 me-5">
                              <Form.Check type="checkbox" value="Football" onChange={hobbyInputHandler} id="Football-checkbox" label="Football" checked={hobby?.some(h => h === "Football")}/>
                              <Form.Check type="checkbox" value="Reading" onChange={hobbyInputHandler} id="Reading-checkbox" label="Reading" checked={hobby?.some(h => h === "Reading")}/>
                              <Form.Check type="checkbox" value="VideoGame" onChange={hobbyInputHandler} id="game-checkbox" label="Video game" checked={hobby?.some(h => h === "VideoGame")}/>
                              <Form.Check type="checkbox" value="Painting" onChange={hobbyInputHandler} id="Painting-checkbox" label="Painting" checked={hobby?.some(h => h === "Painting")}/>
                              <Form.Check type="checkbox" value="Fishing" onChange={hobbyInputHandler} id="Fishing-checkbox" label="Fishing" checked={hobby?.some(h => h === "Fishing")}/>
                              <Form.Check type="checkbox" value="Baking" onChange={hobbyInputHandler} id="Baking-checkbox" label="Baking" checked={hobby?.some(h => h === "Baking")}/>
                          </div>
                      </Form.Group>
                  </Col>
              </Row>
              <Row className="mt-5 mb-3">
                  <Col sm="3">
                      <Button variant="primary"
                      onClick={() => addNew()}
                      >
                          Add <Plus />
                      </Button>
                  </Col>
              </Row>
              <Row sm={8} className="d-flex justify-content-evenly bg-primary py-3 text-light">
                  <Col className="text-center">Year</Col>
                  <Col className="text-center">Myanmar</Col>
                  <Col className="text-center">English</Col>
                  <Col className="text-center">Mathmetic</Col>
                  <Col className="text-center">History</Col>
                  <Col className="text-center">Sience</Col>
                  <Col className="text-center">Total</Col>
                  <Col className="text-center">Delete</Col>
              </Row>
              {
                  reports?.map((report,index)=>
                      <Row key={index} sm={8} className="d-flex justify-content-evenly py-3 border bg-light">
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={new Date().getFullYear()}
                                      value={report.academicYear}
                                      onChange={(e) => handleReportChange(index, 'academicYear', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={report.myanmar}
                                      onChange={(e) => handleReportChange(index, 'myanmar', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={report.english}
                                      onChange={(e) => handleReportChange(index, 'english', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={report.mathematic}
                                      onChange={(e) => handleReportChange(index, 'mathematic', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={report.history}
                                      onChange={(e) => handleReportChange(index, 'history', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={report.science}
                                      onChange={(e) => handleReportChange(index, 'science', e.target.value)}
                                  />
                              </Col>
                              <Col className="justify-content-center">
                                  <Form.Control
                                      type="number"
                                      min={0}
                                      max={500}
                                      value={report.total}
                                      onChange={(e) => handleReportChange(index, 'total', e.target.value)}
                                  />
                              </Col>
                              <Col className="d-flex justify-content-center">
                                  <Button onClick={() => removeReport(index)} variant="danger" size="sm">
                                      <Trash />
                                  </Button>
                              </Col>
                      </Row>
                  )
              }
              <Row className="justify-content-center my-5">
                  <Col sm="2" className="justify-content-center">
                      <Button disabled={!canCreate} type="submit" variant="primary" className="w-100">
                          {status === "loading"? "Loading..." : "Save"} 
                      </Button>
                  </Col>
              </Row>
          </Form>
      </Container>
  );
}

export default UpdateForm;
