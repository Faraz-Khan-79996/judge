import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
// import { c, cpp, java, python } from './solutions'
import { Clipboard } from 'react-bootstrap-icons';

export default function Solution_code({cSolution , 
  cppSolution , javaSolution , 
  pythonSolution}) {
  return (
    <div className="container">


      <Tab.Container id="left-tabs-example" defaultActiveKey="cpp">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="cpp">C++</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="c">C</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="python">Python</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="java">Java</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="cpp">
                <div className="container mt-5">
                <button onClick={() => {
          navigator.clipboard.writeText(cppSolution);
          alert("copied!")
        }} className="btn btn-secondary mb-3 btn-lg">Solution in C++ : <Badge bg="warning"><Clipboard size={20} /></Badge></button>
                  <div className="border p-3 rounded">
                    <textarea
                      className="form-control"
                      rows="35"
                      value={cppSolution}
                      readOnly
                    ></textarea>
                  </div>
                </div></Tab.Pane>
              <Tab.Pane eventKey="c">
                <div className="container mt-5">
                <button onClick={() => {
          navigator.clipboard.writeText(cSolution);
          alert("copied!")
        }} className="btn btn-secondary mb-3 btn-lg">Solution in C : <Badge bg="warning"><Clipboard size={20} /></Badge></button>
                  <div className="border p-3 rounded">
                    <textarea
                      className="form-control"  
                      rows="35"
                      value={cSolution}
                      readOnly
                    ></textarea>
                  </div>
                </div></Tab.Pane>
              <Tab.Pane eventKey="python">
                <div className="container mt-5">
                <button onClick={() => {
          navigator.clipboard.writeText(pythonSolution);
          alert("copied!")
        }} className="btn btn-secondary mb-3 btn-lg">Solution in Python : <Badge bg="warning"><Clipboard size={20} /></Badge></button>
                  <div className="border p-3 rounded">
                    <textarea
                      className="form-control"
                      rows="30"
                      value={pythonSolution}
                      readOnly
                    ></textarea>
                  </div>
                </div></Tab.Pane>
              <Tab.Pane eventKey="java">
                <div className="container mt-5">
                <button onClick={() => {
          navigator.clipboard.writeText(javaSolution);
          alert("copied!")
        }} className="btn btn-secondary mb-3 btn-lg">Solution in Java : <Badge bg="warning"><Clipboard size={20} /></Badge></button>
                  <div className="border p-3 rounded">
                    <textarea
                      className="form-control"
                      rows="30"
                      value={javaSolution}
                      readOnly
                    ></textarea>
                  </div>
                </div></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}