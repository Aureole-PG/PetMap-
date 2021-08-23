import React from "react";
import Layout from "../../layout";
import Head from "next/head";
import Image from "next/image";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import Router from "next/router";
import api from "../../hooks/axios_client";
import jwt from "jsonwebtoken";
export default function AddPet() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      formData["user_id"] = jwt.decode(localStorage.getItem("token")).id;
      addPet(formData);
    },
    onSubmitWithErrors: (e) => {
      console.log(e);
    },
  });

  const addPet = (data) => {
    api
      .post("/addPet", data)
      .then((e) => {
        Router.back();
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };
  return (
    <Container>
      <Head>
        <title>Agregar mascota</title>
      </Head>
      <Row>
        <Col className="mx-auto text-center">
          <h5>Agrega tu mascota al sistema</h5>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={4}>
          <div className="mx-auto">
            <Image src="/mas_pet.svg" width={200} height={200} />
          </div>
        </Col>
        <Col sm={12} md={6} lg={8}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="PetName">Nombre</Label>
              <Input
                type="text"
                onChange={formik.handleChange}
                name="nombre"
                id="PetName"
                placeholder="ingrese el nombre de su mascota"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Tipo">Tipo de mascota</Label>
              <Input
                type="select"
                onChange={formik.handleChange}
                name="tipo"
                id="Tipo"
              >
                <option disabled={true} selected={true}>
                  Elige tu mascota
                </option>
                <option>Perro</option>
                <option>Gato</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="PetRaze">Raza</Label>
              <Input
                type="text"
                onChange={formik.handleChange}
                name="raza"
                id="PetRaze"
                placeholder="ingrese la raza de su mascota"
              />
            </FormGroup>
            <FormGroup>
              <Label for="GPSID">GPS</Label>
              <Input
                type="text"
                onChange={formik.handleChange}
                name="gps_id"
                id="GPSID"
                placeholder="ingrese el ID del GPS de su mascota"
              />
            </FormGroup>
            <Row className="row justify-content-around">
              <Col>
                <Button className="btn-primary" type="submit">
                  Agregar
                </Button>
              </Col>
              <Col>
                <Button type="button" onClick={() => Router.back()}>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

AddPet.Layout = Layout;

function initialValues() {
  return {
    nombre: "",
    tipo: "",
    raza: "",
    gps_id: "",
  };
}

function validationSchema() {
  return {
    nombre: yup.string().required(true),
    tipo: yup.string().required(true),
    raza: yup.string().required(true),
    gps_id: yup.string().required(true),
  };
}
