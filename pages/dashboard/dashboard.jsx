import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Container,
} from "reactstrap";
import ReactLoading from "react-loading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import { userId } from "../../hooks/token";
import api from "../../hooks/axios_client";
import Loading from "../../components/loading";
function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (userId()) {
      api
        .get("/getPets?user_id=" + userId())
        .then((e) => {
          setPets(e.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      router.replace("/");
    }
  }, []);
  const viewPet = (id) => {
    setLoading(true);
    router.push(`/dashboard/${id}`);
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <Row>
          {pets.map((pet) => (
            <Col key={pet._id} xs="12" sm="12" md="5" lg="3">
              <Card style={{ height: 400, marginBlock: 20 }}>
                <div className="mx-auto" style={{ borderRadius: "50px" }}>
                  <Image src="/pet_a.svg" width={200} height={200} />
                </div>

                <CardBody>
                  <CardTitle tag="h5">Nombre: {pet.nombre}</CardTitle>
                  <CardText>{pet.tipo}</CardText>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Raza: {pet.raza}
                  </CardSubtitle>
                  <button
                    className="btn btn-primary"
                    onClick={() => viewPet(pet._id)}
                  >
                    Ver
                  </button>
                </CardBody>
              </Card>
            </Col>
          ))}

          <Col xs="12" sm="12" md="5" lg="3">
            <Card style={{ height: 400, opacity: 0.5 }}>
              <div className="mx-auto">
                <Image src="/mas_pet.svg" width={200} height={200} />
              </div>

              <CardBody className="mx-auto text-center">
                <CardTitle tag="h5">Registra o agrega Tu mascata</CardTitle>
                <div className="mx-auto">
                  <Link href="/dashboard/addPet">
                    <a style={{ color: "#717171" }}>
                      <AiFillPlusCircle size={"50%"} />
                    </a>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Dashboard.Layout = Layout;
export default Dashboard;
