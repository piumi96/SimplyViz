import React from "react";
import "./editor.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Editor extends React.Component {

  render() {
    return (
      <Container className="codeSpace">
        <Row>
          <Col>
            <p> Code Space </p>
          </Col>
        </Row>
        <Row className="block">
          <ol>
            <li>import math;</li>
            <li>function main (in: ) out: no (</li>
            <li>int a = 4;</li>
            <li>int b = 3</li>
            <li>int sum = a + b;</li>
            <li>print(sum);</li>
            <li>);</li>
          </ol>
        </Row>
      </Container>
    );
  }
}
