import React from "react";
import "./Viz.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export class Viz extends React.Component {
  render() {
    return (
      <Container className="Visual-space">
        <Row>
          <Col>
            <p>Visualizer Space</p>
          </Col>
        </Row>
        <Row style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
          <Col className="Input">
            <label>Keyboard Input: </label>
          </Col>
          <Col className="Output">
            <label>Print: </label>
          </Col>
        </Row>
        <Row style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
          <Col className="External-lib">
            <label>External Libraries: </label>
          </Col>
        </Row>
        <div className="Program-area">
          <p>Program Area</p>
          <Row>
            <Col>
              <Table
                responsive
                striped
                bordered
                hover
                className="Table-function"
              >
                <thead>
                  <tr>
                    <th colSpan="3">Function: main</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Parameters</th>
                    <th>Data Type</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <td>In</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Out</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table
                responsive
                striped
                bordered
                hover
                className="Table-variable"
              >
                <thead>
                  <tr>
                    <th colSpan="3">Variables and Constants</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Data Type</th>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                responsive
                striped
                bordered
                hover
                className="Table-condition"
              >
                <thead>
                  <tr>
                    <th colSpan="2">IF Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Condtion</th>
                    <th>Result</th>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table responsive striped bordered hover className="Table-loop">
                <thead>
                  <tr>
                    <th colSpan="3">Loops</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Condition</th>
                    <th>Result</th>
                    <th>Next Value</th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
