import React from 'react';
import ReactDOM from 'react-dom';

export class Viz extends React.Component {
    render(){
        return (
            <h1> This is the visualizer block </h1>
        );
    }
}

ReactDOM.render(
    <Viz />,
    document.getElementById("root")
);