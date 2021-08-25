import React from "react";
import { Row, Col, Badge, Button, Container } from "reactstrap";
export const Information = ({ direction, pet, allowUser, distancia }) => {
  return (
    <div className="pet-info-header-container">
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs={6}>
            <p className="text-title text-center">{pet?.nombre ?? ""}</p>
          </Col>
          <Col
            xs={6}
            className="d-flex   justify-content-center align-items-center"
          >
            {allowUser ? (
              <>
                <p
                  style={{ marginInline: 5 }}
                  className="text-info- no-margin text-secondary"
                >
                  distancia:
                </p>
                <p className="text-subtitle text-center">{distancia}Km.</p>
              </>
            ) : (
              <p className="text-info- text-center">------</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="text-info- text-center">{direction}</p>
          </Col>
        </Row>
        <Row style={{ marginBottom: "5px" }}>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <p className="text-info- text-secondary no-margin ">estado: </p>
              <Badge style={{ marginInline: 10 }} color="primary" pill>
                Cerca
              </Badge>
            </div>

            <Button color="secondary">Configuracion</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
