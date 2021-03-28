import React from "react";
import ReactDOM from "react-dom";

export class Editor extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the code space</h1>
      </div>
    );
  };
}

ReactDOM.render(
    <Editor />,
    document.getElementById('root')
);
