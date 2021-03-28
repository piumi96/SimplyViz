import React from "react";
import "./editor.css";

export class Editor extends React.Component {

  render() {
    return (
      <div>
        <p className="codeSpace">
          import math; <br />
          function main (in: ) out: no ( <br />
          int a = 4; <br />
          int b = 3 <br />
          int sum = a + b; <br />
          print(sum); <br />)
        </p>
      </div>
    );
  }
}
