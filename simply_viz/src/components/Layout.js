import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from './editor';
import { Viz } from './Viz';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Layout extends React.Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs md lg = {4}> < Editor /> </Col>
                    <Col> <Viz />  </Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(
    <Layout />,
    document.getElementById("root")
);