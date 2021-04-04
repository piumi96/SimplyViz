import React from "react";
import "./codeSpace.css";
import alien from "./assets/alien.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

var data = require("./assets/code.json");
var sourceMap = require("./assets/sourceMap.json");
var currentLine = 0;
var codeOrder;

export class CodeSpace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [
        "function main(in: ) out: no {",
        "int a = 3;",
        "int b = 4;",
        "int sum = a + b;",
        "print(sum);",
        "}",
      ],
      currentLine: 0,
      lineData: [],
    };

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);

    this.mapCodeOrder();

  }

  mapCodeOrder() {
    codeOrder = [];
    data.map((obj) => {
      var line = sourceMap.filter(
        (i) => i.Java === parseInt(obj.Line.slice(9))
      );
      codeOrder.push(line[0].Simply - 1);
    });
  }

  onClickNext() {
    this.onVisualizeData(currentLine);
    currentLine++;
    this.setState({ currentLine: currentLine });
  }

  onClickBack() {
    this.onVisualizeData(currentLine);
    currentLine--;
    this.setState({ currentLine: currentLine });
  }

  getClassName(i) {
    return currentLine === codeOrder[i] ? "highlight" : "not-highlight";
  }

  onVisualizeData(sourceLine) {
    var source = sourceMap.filter((i) => i.Simply === sourceLine + 1);
    if (source) {
      var lineData = data.filter(
        (i) => parseInt(i.Line.slice(9)) === source[0].Java
      );
      this.handleVisualize(lineData, currentLine);
      this.setState({ lineData: lineData });
    }
    
    //console.log(this.state.lineData);
  }

  handleVisualize(data, line) {
    this.props.getCodeData(data, line);
  }

  render() {
    return (
      <div>
        <h3 className="h3 text-center pb-3">Code</h3>
        <ol>
          {this.state.code.map((line, i) => (
            <li className={this.getClassName(i)} key={i}>{line} </li>
          ))}
        </ol>

        <Row>
          <Col className="col-3 pl-1 pr-1">
            <Button
              className="btn btn-md btn-primary mb-3"
              onClick={this.onClickBack}
            >
              Back
            </Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Stop</Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button className="btn btn-md btn-primary mb-3">Start</Button>
          </Col>
          <Col className="col-3 pl-1 pr-1">
            <Button
              className="btn btn-md btn-primary mb-3"
              onClick={this.onClickNext}
            >
              Next
            </Button>
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
