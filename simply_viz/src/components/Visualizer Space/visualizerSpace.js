import React from "react";
import "./visualizerSpace.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

var imports = [];

export class VisualizerSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.getCodeData.code,
      codeData: this.props.getCodeData.codeData,
      lineNumber: this.props.getCodeData.lineNumber,
    };

    this.getKeyIn = this.getKeyIn.bind(this);
    this.getPrint = this.getPrint.bind(this);
    this.getExternals = this.getExternals.bind(this);

  }

  getKeyIn() {
    return "none";
  }

  getPrint() {
    var line = this.state.lineNumber;
    var data = "";
    if(line >= 0){
      var code = this.state.code[line];
      if(code.includes("print")){
        data = this.state.codeData[0].Value.sum;
      }
    }
    return data;
  }

  getExternals() {
    var line = this.state.lineNumber;
    var data = "";
    if(line>=0){
      var code = this.state.code[line];
      if(code.includes("import")){
        data = code.slice(7);
      }
    }
    imports.push(data);
    return imports;
  }

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
            <p class="p text-center py-1 p-box">
              External Libraries:
              <ol>
                {this.getExternals().map((lib, i) => (
                  <li key={i}>{lib}</li>
                ))}
              </ol>
            </p>
          </Col>
        </Row>
        <Row>
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
                            main
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="2">Parameter</td>
                          <td colspan="2">Data type</td>
                          <td colspan="2">Value</td>
                        </tr>
                        <tr>
                          <td colspan="2">in</td>
                          <td colspan="2"></td>
                          <td colspan="2"></td>
                        </tr>
                        <tr>
                          <td colspan="2">out</td>
                          <td colspan="2">Void</td>
                          <td colspan="2"></td>
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
                        <tr>
                          <td colspan="2" rowspan="2">
                            int
                          </td>
                          <td colspan="2" rowspan="2">
                            i
                          </td>
                          <td colspan="2" rowspan="2">
                            0
                          </td>
                        </tr>
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
                        <tr>
                          <td colspan="4">true</td>
                          <td colspan="2">true</td>
                        </tr>
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
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossorigin="anonymous"
        ></script>
      </div>
    );
  }
}
