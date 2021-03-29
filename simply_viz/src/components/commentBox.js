import React from 'react';
import "./commentBox.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

export class CommentBox extends React.Component {
    render() {
        return (
          <Container>
            <Row>
              <Col className="imageBlock">
              </Col>
              <Col>
                <Card
                  fluid
                  min-width="max-content"
                  className="mb-2"
                  text="white"
                  style={{ width: "100%", backgroundColor: "#6600C5"}}
                >
                  <Card.Header>Line Number: </Card.Header>
                  <Card.Body>
                    <Card.Title> Explaination: </Card.Title>
                    <Card.Text>Comment on line visualization</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
}