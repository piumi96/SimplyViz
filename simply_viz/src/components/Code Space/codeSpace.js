import React from "react";
import "./codeSpace.css";
import alien from "./assets/spacep.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStop,
  faStepForward,
  faPlay,
  faBookOpen,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

var data = require("./assets/code.json");
var sourceMap = require("./assets/sourceMap.json");
var comments = require("./assets/comments.json");

var currentLine = 0;
var codeOrder, interval;
var next,
  back = 0;
var repeat = 0;
var stop = true;
var dataTypes = ["integer", "float", "boolean", "string", "character"];
var commentTag = 0;
var commentNextClass = "btn-comment";
var commentBackClass = "btn-comment d-none";

export class CodeSpace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [
        "function main(in: ) out: no {",
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
        "}",
        /* "function main(in: ) out: no {",
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
        "}", */
      ],
      currentLine: -1,
      lineData: [],
      vizData: this.props.getVizData,
      commentData: comments.mainFunc.split(".").filter((i) => i !== ""),
      commentTag: 0,
    };

    repeat = 0;

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onComments = this.onComments.bind(this);
    this.onCommentNext = this.onCommentNext.bind(this);
    this.onCommentBack = this.onCommentBack.bind(this);

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
    //console.log(next);
    if (next < codeOrder.length - 1) {
      next++;
      back = next;
      currentLine = codeOrder[next];
      console.log(next);
      console.log(codeOrder[next]);

      if (codeOrder[next] !== codeOrder[next - 1]) {
        repeat = 0;
      } else {
        repeat++;
      }
    }
    commentTag = 0;

    this.onComments();
    this.onVisualizeData(currentLine, repeat);
    this.setState({ currentLine: currentLine, commentTag: commentTag });
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
    commentTag = 0;

    this.onComments();
    this.setState({ currentLine: currentLine, commentTag: commentTag });
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
      }, 2000);
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

  onComments() {
    var line = currentLine;
    var code = this.state.code;
    var commentData = "";
    var funcName = "";

    /* if (code[line].includes("function")) {
      commentData = comments.functions;
      funcName = code[line].slice(
        code[line].lastIndexOf("function") + 9,
        code[line].lastIndexOf("in:") - 1
      );
      commentData += comments.insideFunctions + funcName;
    } else  */
    if(line !== 0){
      if(code[line-1].includes("function")){
        funcName = code[line-1].slice(
          code[line-1].lastIndexOf("function") + 9,
          code[line-1].lastIndexOf("in:") - 1
        );
        commentData = comments.insideFunctions + funcName + ".";
      }
    }
    
    if (code[line].includes("if") || code[line].includes("else")) {
      commentData += comments.conditions;
    } else if (code[line].includes("repeat")) {
      commentData += comments.loops;
    } else if (code[line].includes("display")) {
      commentData += comments.prints;
    } else if (code[line].includes("input()")) {
      commentData += comments.keyins;
    } else if (code[line].includes("get ")) {
      commentData += comments.externals;
    } else if (code[line].includes("return ")) {
      commentData += comments.return;
    } else {
      for (var i in dataTypes) {
        if (code[line].includes(dataTypes[i])) {
          commentData +=
            comments.variables + " This variables is a " + dataTypes[i] +". " + comments.varTable;
          break;
        }
      }
    }
    var render = commentData.split(".").filter((i) => i !== "");
    this.setCommentClass(render);

    this.setState({commentData: render});
  }

  onCommentNext() {
    console.log(commentTag);
    var comments = this.state.commentData;
    if(commentTag !== comments.length-1){
      commentTag++;
    }
    this.setCommentClass(comments);
    this.setState({commentTag: commentTag});
  }
  
  onCommentBack() {
    var comments = this.state.commentData;
    if (commentTag > 0) {
      commentTag--;
    }
    this.setCommentClass(comments);
    this.setState({ commentTag: commentTag });
  }

  setCommentClass(comments){
    commentNextClass = commentTag === comments.length-1 ? "btn-comment d-none" : "btn-comment";
    commentBackClass = commentTag === 0 ? "btn-comment d-none" : "btn-comment";
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
        <Row>
          <Col className="col-2">
            <img className="img-alien" src={alien} alt="alien"></img>
          </Col>
          <Col className="col-10">
            <Card className="card text-light comment-box">
              <div className="card-body pb-2 pt-2 pl-2 pr-4">
                <h5 className="card-title">
                  Notes : <FontAwesomeIcon icon={faBookOpen} />
                </h5>
                {console.log(this.state.commentData)}
                <p>
                  {this.state.commentData.filter(
                    (comment, i) => i === commentTag
                  )}
                </p>
                <Row>
                  <Col className="text-left pr-0">
                    <Button
                      className={commentBackClass + " p-0 btn-cor"}
                      onClick={this.onCommentBack}
                    >
                      &#8810;<u>Prev</u>
                    </Button>
                  </Col>
                  <Col className="text-right p-0">
                    <Button
                      className={commentNextClass + " p-0 btn-cor"}
                      onClick={this.onCommentNext}
                    >
                      <u>Next</u>&#8811;
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
