import React from "react";
import "./codeSpace.css";
import alien from './assets/alien.png';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class CodeSpace extends React.Component {
  constructor() {
    super();
    this.state = {
      code: [
        "function main(in: ) out: no {",
        "int a = 3;",
        "int b = 4;",
        "int sum = a + b;",
        "print(sum);",
        "}"
      ]
    }
  };

  render() {
    return (
      <div>
        <h3 className="h3 text-center pb-3">Code</h3>
        <ol>
          {this.state.code.map((line) => (
            <li> {line} </li>
          ))}
        </ol>

        <Row>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Back</Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Stop</Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Start</Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Next</Button>
          </Col>
        </Row>

        <Row>
          <Col className="col-2">
            <img className="img-alien" src={alien} alt="alien"></img>
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
