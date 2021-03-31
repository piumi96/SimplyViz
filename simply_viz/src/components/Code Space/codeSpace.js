import React from "react";
import "./codeSpace.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export class CodeSpace extends React.Component {
  render() {
    return (
      <div>
        <h3 className="h3 text-center pb-3">Code</h3>
        <ol>
          <li>function main(in: ) out: no (</li>
          <li>int a = 4;</li>
          <li>int b = 3</li>
          <li>int sum = a + b;</li>
          <li>print(sum);</li>
          <li>);</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>

        <Row>
          <Col className="col-2">
            <img src="/codeSpace/assets/alien.png" alt="alien"></img>
          </Col>
          <Col className="col-10">
            <Card
              className="card text-light"
              style={{ backgroundColor: "#6600C5" }}
            >
              <div className="card-body">
                <h5 className="card-title">Comments :</h5>
                <p class="card-text"></p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}