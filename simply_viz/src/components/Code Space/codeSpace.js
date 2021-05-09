import React from "react";
import "./codeSpace.css";
import alien from "./assets/spacep.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faStop, faStepForward, faPlay, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

var data = require("./assets/code1.json");
var sourceMap = require("./assets/sourceMap1.json");
var currentLine = 0;
var codeOrder, interval;
var next,
  back = 0;
var repeat = 0;
var stop = true;

export class CodeSpace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [
        /* "function main(in: ) out: no {",
        "integer a = 3;",
        "integer b = 4;",
        "integer sum = 0;",
        "if(a<b){",
        "sum = add(a,b);",
        "}",
        "if(a>b){",
        "sum = 0;",
        "}",
        "display(sum);",
        "}",
        "",
        "function add(in: integer a, integer b) out: integer {",
        "return a + b;",
        "}", */
        "function main(in: ) out: no {",
        "integer a = 3;",
        "integer b = 4;",
        "integer sum = 0;",
        "if(a<b){",
        "sum = a + b;",
        "}",
        "repeat(integer i; range: 0 to a; next:1){",
        "sum = sum + 1;",
        "}",
        'display("sum =" + sum);',
        "}",
      ],
      currentLine: -1,
      lineData: [],
    };

    repeat = 0;

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.onClickStart = this.onClickStart.bind(this);

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
    next = codeOrder.indexOf(currentLine);
    back = next;
    //console.log(codeOrder);
  }

  onClickNext() {
    if (next < codeOrder.length - 1) {
      next++;
      back = next;
      currentLine = codeOrder[next];

      if (codeOrder[next] !== codeOrder[next - 1]) {
        repeat = 0;
      } else {
        repeat++;
      }

      //console.log("current line: " + currentLine);
    }
    this.onVisualizeData(currentLine, repeat);
    this.setState({ currentLine: currentLine });
  }

  onClickBack() {
    if (back >= 1) {
      back--;
      next = back;
      currentLine = codeOrder[back];

      if (codeOrder[back] !== codeOrder[back - 1]) {
        repeat = 0;
      } else {
        var count = 0;
        for (var i = back - 1; i > 0; i--) {
          if (codeOrder[back] === codeOrder[i]) {
            count++;
          } else {
            break;
          }
        }
        repeat = count;
      }

      //console.log("current line: " + currentLine);
    }
    this.setState({ currentLine: currentLine });
    this.onVisualizeData(currentLine, repeat);
  }

  onClickStop() {
    stop = true;
    clearInterval(interval);
  }

  onClickStart() {
    stop = false;
    this.onClickNext();
    if (!stop) {
      interval = setInterval(() => {
        if (next < codeOrder.length - 1) {
          this.onClickNext();
        } else {
          this.onClickStop();
        }
      }, 1000);
    }
  }

  getClassName(i) {
    if (
      i === currentLine &&
      (currentLine === 0 || currentLine === codeOrder[next])
    ) {
      return "highlight";
    } else {
      return "not-highlight";
    }
  }

  onVisualizeData(sourceLine, repeat) {
    var source = sourceMap.filter((i) => i.Simply === sourceLine + 1);
    if (source !== undefined) {
      var lineData = [];
      var newData = data.filter(
        (i) => parseInt(i.Line.slice(9)) === source[0].Java
      );
      lineData.push(newData[repeat]);
      //console.log(lineData);

      this.handleVisualize(
        lineData,
        currentLine - 1,
        this.state.code,
        codeOrder
      );
      this.setState({ lineData: lineData });
    }
  }

  handleVisualize(data, line, code, order) {
    this.props.getCodeData(data, line, code, order);
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="col-12 pl-0">
            <ol>
              {this.state.code.map((line, i) => (
                <li className={this.getClassName(i)} key={i}>
                  {line}{" "}
                </li>
              ))}
            </ol>
          </Col>
        </Row>

        <Row> 
          <Col className="flex-end">
            <Button className="btn btn-primary mb-3" onClick={this.onClickBack}>
              <FontAwesomeIcon icon={faStepBackward} />
            </Button>
          </Col>
          <Col>
            <Button className="btn btn-primary mb-3" onClick={this.onClickStop}>
              <FontAwesomeIcon icon={faStop} />
            </Button>
          </Col>
          <Col>
            <Button
              className="btn btn-primary mb-3"
              onClick={this.onClickStart}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          </Col>
          <Col>
            <Button className="btn btn-primary mb-3" onClick={this.onClickNext}>
              <FontAwesomeIcon icon={faStepForward} />
            </Button>
          </Col>
          
        </Row>

        {/* <Row>
          <Col className="col-2"></Col>
          <Col className="col-8 pl-1 pr-1">
            <Button
              className="btn btn-md btn-primary mb-3 w-100"
              onClick={this.onClickRestart}
            >
              RESTART
            </Button>
          </Col>
          <Col className="col-2"></Col>
        </Row>*/}
        <Row>
          <Col className="col-2">
            <img className="img-alien" src={alien} alt="alien"></img>
          </Col>
          <Col className="col-10">
            <Card className="card text-light comment-box">
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
