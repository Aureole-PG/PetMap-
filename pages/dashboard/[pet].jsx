import React,{useEffect, useState, useRef} from 'react';
import Layout from '../../layout';
import {useRouter} from 'next/router';
import {  withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {
    Card, CardBody,  ModalHeader, ModalBody, ModalFooter,
    CardTitle, CardSubtitle, Button, Row, Col, Label,Input,
    ListGroup, ListGroupItem, Badge,Modal,Form,FormGroup,CardText
  } from 'reactstrap';
import  {useFormik} from 'formik';
import * as yup  from 'yup';
import api,{gpsApi} from '../../hooks/axios_client';
import ReactLoading from 'react-loading';
import Geocode from "react-geocode";
Geocode.setApiKey( process.env.NEXT_PUBLIC_GOOGLE_KEY);
const CMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={props.defaultCenter}
        center={props.center}
    >
        {props.children}
    </GoogleMap>
  ));



export default function Pet() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [pet, setPet]  = useState({})
    const [modal, setModal] = useState(false);
    const [position, setPosition] = useState({  lat: 0, lng: 0, direcction:""  })
    const [map, setMap] = useState(false)
    const [ubications, setUbications] = useState([])
    const [currentUbication, setCurrentUbication] = useState(true)
    const marker = useRef(null)


    const toggle = () => setModal(!modal);

    useEffect(() => {
        
        api.get(`/pet?_id=${router.query.pet}`)
        .then((e)=>{
            setPet(e.data)
            getLocations(e.data._id,e.data.gps_id)
            setLoading(false)
        })
        .catch((e)=>{
            router.back()
        })
    }, [])
    

    const getLocations=(pet_id, gps_id)=>{
        api.get(`/locations?pet_id=${pet_id}&gps_id=${gps_id}`)
        .then((locationResponse)=>{
            
            setUbications(locationResponse.data)
            updateUbication(gps_id)
        } )
        .catch((error)=>{
            console.log(error)
        })
    }
    const saveLocation = (locationData)=>{
        api.post('/locations',locationData).then(e=>{
            getLocations(pet._id,pet.gps_id)
            toggle()
        })
    }

    const newLocationFormik = useFormik({
        initialValues: descripcionValues(),
        validationSchema: yup.object(descriptionValidation()),
        onSubmit: (formData)=>{
            let data= {
                ...formData,
                longitud: position.lng.toString(),
                latitud: position.lat.toString(),
                user_id: pet.user_id,
                gps_id: pet.gps_id,
                pet_id: pet._id,
                direccion: position.direcction
            }
            saveLocation(data)
        }
    })



    const getposition= (lat, lng , direction ) =>{
        setCurrentUbication(false)
        setPosition(
            {
                lat: parseFloat(lat), lng: parseFloat(lng), direcction: direction
            }
        )
    }

    const  updateUbication=(id)=>{
        setMap(false)
        setCurrentUbication(true)
        gpsApi.get(`/gps/${pet.gps_id||id}`).then(e=>{
            const {latitud, longitud} = e.data.data
            Geocode.fromLatLng( `${latitud}`,`${longitud}` ).then(
            response => {
              const address = response.results[0].formatted_address;
                setPosition({
                    lat: parseFloat(latitud), lng: parseFloat(longitud), direcction: address
                })
                setMap(true)
            },
            error => {
              console.error(error);
            }
        );
        }).catch(e=>{
            console.log(e)
        })

    }

    if (loading) {
        return(
            <div style={{height: '100vh'}} className="row align-items-center">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <ReactLoading type={'bubbles'} color={'#00b0ff'} height={'20%'} width={'20%'} />
                    </div>
                </div>
            </div>
        )
        
    }else{
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted"> Ubicacion actual {position.direcction}</CardSubtitle>
                                        {
                                            currentUbication?(
                                                <p>
                                                    <Button color="secondary" onClick={toggle}>Guardar Ubicacion</Button>
                                                </p>
                                            ):null
                                        }
                                        
                                        <p>
                                            <Button color="primary" onClick={()=>{updateUbication(); setMap(false)}}>Actualizar Ubicación</Button>
                                        </p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <CardTitle tag="h5">{pet.tipo}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted"> Nombre de mascota: {pet.nombre}</CardSubtitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">Raza: {pet.raza}</CardSubtitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">GPS ID: {pet.gps_id}</CardSubtitle>
                                    </Col>
                                </Row>
                            </CardBody>
                            
                            <Modal isOpen={modal} toggle={toggle} >
                                
                                    <Form onSubmit={newLocationFormik.handleSubmit}>
                                        <ModalHeader toggle={toggle}>Guardar Ubicación</ModalHeader>
                                        <ModalBody>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted"> Ubicacion actual {position.direcction}</CardSubtitle>
                                            <FormGroup>
                                                <Label for="registerName">Descripción</Label>
                                                <Input type="text" invalid={newLocationFormik.errors.nombre?true:false}  onChange={newLocationFormik.handleChange} name="descripcion" id="registerName" placeholder="Ingrese un comentario"/>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button  type='submit' color="primary">Guardar</Button>
                                            <Button color="secondary" onClick={toggle}>Cancelar</Button>
                                        </ModalFooter>
                                    </Form>
                                
                            </Modal>
                        </Card>
                    </Col>
                    <Col xs={12}>
                        
                    </Col>
                </Row>
                <Row>
                    
                    <Col xs={12} sm={12} md={8}>
                        {map?(
                            <CMap
                            
                                isMarkerShown
                                googleMapURL={ `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                center={{lat: position.lat, lng: position.lng}}
                            >   

                                
                                <Marker 
                                    ref={marker} 
                                    position={{lat: position.lat, lng: position.lng}} 
                                />
                                
                            </CMap>
                        ):null} 
                        
                    </Col>
                    <Col style={{height: '400px', overflowY: 'scroll'}} xs={12} sm={12} md={4}>
                        <ListGroup>
                            {ubications.map(ubication=>(
                                <ListGroupItem key={ubication._id} style={{cursor: 'pointer'}} className="justify-content-between" onClick={ ()=>getposition(ubication.latitud, ubication.longitud, ubication.direccion)}>
                                    <CardTitle tag="h5">Dirección: <p>{ubication.direccion}</p></CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">fecha <p>{ubication.date}</p></CardSubtitle>
                                    <CardText>{ubication.descripcion}</CardText>
                                </ListGroupItem>
                            ))}
                            
                        </ListGroup>
                    </Col>
                </Row>
                
            </div>
        )
    }
    
}

Pet.Layout= Layout

function descripcionValues(){
    return {
        descripcion: ""
    }
}

function descriptionValidation (){
    return{
        descripcion: yup.string().required(true)
    }
}
