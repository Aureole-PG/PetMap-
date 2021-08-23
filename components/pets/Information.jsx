import React from "react";
import { Row, Col, Badge, Button, Container, Alert } from "reactstrap";
export const Information = () => {
  return (
    <div className="pet-info-header-container">
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs={6}>
            <p className="text-title text-center">Npmbre</p>
          </Col>
          <Col
            xs={6}
            className="d-flex   justify-content-center align-items-center"
          >
            <p className="text-subtitle text-center">raza</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="text-info- text-center">Direccion</p>
          </Col>
        </Row>
        <Row style={{ marginBottom: "5px" }}>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <p className="text-info- text-secondary no-margin ">estado: </p>
              <Badge style={{ marginInline: 10 }} color="primary" pill>
                Primary
              </Badge>
            </div>

            <Button color="secondary">Configuracion</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
