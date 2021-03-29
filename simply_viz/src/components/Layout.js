import React from 'react';
import ReactDOM from 'react-dom';
import {Editor} from './editor';
import {Viz} from './Viz';
import {CommentBox} from './commentBox';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';

export class Layout extends React.Component {
    render() {
        return (
          <div>
            <Navbar variant="dark" style={{ backgroundColor: "#6600C5" }}>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Navbar>
            <br />
            <Container fluid style={{ padding: "0.25rem", margin: "0.5rem" }}>
              <Row>
                <Col xs md lg={4}>
                  <Row>
                    <Editor />
                  </Row>
                  <Row>
                    <CommentBox />
                  </Row>
                </Col>
                <Col>
                  <Viz />
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}

ReactDOM.render(
    <Layout />,
    document.getElementById("root")
);