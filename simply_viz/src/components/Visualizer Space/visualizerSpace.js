import React from "react";
import "./visualizerSpace.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

var imports = [];
var functions = [];
var variables = [];
var conditions = [];
var dataTypes = ["int", "float", "boolean", "string"];
var operators = ["and", "or", "not"];

export class VisualizerSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.getCodeData.code,
      codeData: this.props.getCodeData.codeData,
      lineNumber: this.props.getCodeData.lineNumber,
      prevLine: 0,
    };

    conditions = [];
    imports = [];
    variables = [];

    this.getKeyIn = this.getKeyIn.bind(this);
    this.getPrint = this.getPrint.bind(this);
    this.getExternals = this.getExternals.bind(this);
    this.getFunctions = this.getFunctions.bind(this);
    this.getVariables = this.getVariables.bind(this);
    this.getConditions = this.getConditions.bind(this);
    this.getLoops = this.getLoops.bind(this);

    this.getFunctions();
  }

  getKeyIn() {
    return "none";
  }

  getPrint() {
    var line = this.state.lineNumber;
    var data = "";
    if (line >= 0) {
      var code = this.state.code[line];
      if (code.includes("print")) {
        data = this.state.codeData[0].Value.sum;
      }
    }
    return data;
  }

  getExternals() {
    var line = this.state.lineNumber;
    var data = "";
    if (line >= 0) {
      var code = this.state.code[line];
      if (code.includes("import")) {
        data = code.slice(7);
      }
    }
    imports.push(data);
    return imports;
  }

  getFunctions() {
    functions = [];
    var inputData = [];
    var code = this.state.code;
    for (var i = 0; i < code.length; i++) {
      if (code[i].includes("function")) {
        var name = code[i].substring(
          code[i].lastIndexOf("function ") + 9,
          code[i].lastIndexOf("(")
        );

        var fin = code[i]
          .substring(code[i].lastIndexOf("in: ") + 3, code[i].lastIndexOf(")"))
          .replace(/ /g, "")
          .split(",");

        for (var j = 0; j < fin.length; j++) {
          for (var k = 0; k < dataTypes.length; k++) {
            if (fin[j].includes(dataTypes[k])) {
              inputData.push({
                type: dataTypes[k],
                name: fin[j].substring(dataTypes[k].length),
              });
            }
          }
        }

        var fout = code[i].substring(
          code[i].lastIndexOf("out: ") + 5,
          code[i].lastIndexOf(" {")
        );
        var data = {
          name: name,
          in: inputData,
          out: fout,
          value: null,
        };
        functions.push(data);
      }
    }
    return functions;
  }

  getVariables() {
    var line = this.state.lineNumber;
    if (line > 0) {
      var codeData = this.state.codeData[0].Value;
      var data = [];
      for (var key in codeData) {
        data.push({
          name: key,
          value: codeData[key],
        });
      }

      variables.push({
        line: line,
        data: data,
      });

      console.log(variables);
    }
    return variables;
  }

  getConditions() {
    var line = this.state.lineNumber;
    var code = this.state.code;
    var subConditions = [];

    if (line > 0) {
      if (code[line].includes("if")) {
        var cond = code[line].substring(
          code[line].lastIndexOf("(") + 1,
          code[line].lastIndexOf("){")
        );
        conditions.push(cond);

        /* for (var op in operators) {
          for (var sub in subConditions) {
            if (subConditions[sub].includes(operators[op])) {
              var str = subConditions[sub].split(operators[op]);
              subConditions = [];
              for(var s in str){
                subConditions.push(str[s].trim());
              }
            }
          }
        } */
      }
    }
    //conditions.push(subConditions);
    return conditions;
  }

  getLoops() {}

  render() {
    return (
      <div>
        <h3 class="h3 text-center pb-3">Visualization Panel</h3>
        <Row>
          <Col className="col-6">
            <p className="p text-center p-box">
              Keyboard input: {this.getKeyIn()}
            </p>
          </Col>
          <Col className="col-6">
            <p className="p text-center p-box">Print: {this.getPrint()}</p>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <div className="p text-center py-1 mb-3 p-box">
              External Libraries:
              {this.getExternals().map((lib, i) => (
                <p key={i}>{lib}</p>
              ))}
            </div>
          </Col>
        </Row>

        <div>
          <p className="p text-center">Program Area:</p>
          {this.getFunctions().map((func, i) => (
            <Row key={i}>
              <Col className="col-12">
                <div className="p text-center p-3 p-box">
                  <Row>
                    <Col className="col-6">
                      <div className="table-responsive table-outer">
                        <Table className="table-bordered text-light table-func">
                          <thead>
                            <tr>
                              <th scope="col" colspan="2">
                                Function :
                              </th>
                              <th scope="col" colspan="4">
                                {func.name}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="1">Parameter</td>
                              <td colspan="1">Data type</td>
                              <td colspan="1">Name</td>
                              <td colspan="1">Value</td>
                            </tr>
                            <tr>
                              <td colspan="1">In</td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.type}</p>
                                ))}
                              </td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.name}</p>
                                ))}
                              </td>
                              <td colspan="1">
                                {func.in.map((obj) => (
                                  <p className="p-0 m-0">{obj.value}</p>
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">Out</td>
                              <td colspan="1">{func.out}</td>
                              <td colspan="1"></td>
                              <td colspan="1"></td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col className="col-6">
                      <div className="table-responsive table-outer">
                        <Table className="table-bordered text-light table-var">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                Variables and Constants:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="2">Data type</td>
                              <td colspan="2">Name</td>
                              <td colspan="2">Value</td>
                            </tr>
                            {this.getVariables().map((line) =>
                              line.data.map((data, i) => (
                                <tr key={i}>
                                  <td colspan="2"></td>
                                  <td colspan="2">{data.name}</td>
                                  <td colspan="2">{data.value}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-6">
                      <div className="table-responsive table-outer">
                        <Table className="table-bordered text-light table-if">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                IF conditions :
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="4">Condition</td>
                              <td colspan="2">Result</td>
                            </tr>
                            {this.getConditions().map((line) => (
                              <tr>
                                <td colspan="4">{line}</td>
                                <td colspan="2"></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col className="col-6">
                      <div className="table-responsive table-outer">
                        <Table className="table-bordered text-light table-loop">
                          <thead>
                            <tr>
                              <th scope="col" colspan="6">
                                Loops :
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colspan="2">Condition</td>
                              <td colspan="2">Result</td>
                              <td colspan="2">Next Value</td>
                            </tr>
                            <tr>
                              <td colspan="2">0 GT 5</td>
                              <td colspan="2">true</td>
                              <td colspan="2">0 + 1</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossorigin="anonymous"
        ></script>
      </div>
    );
  }
}
