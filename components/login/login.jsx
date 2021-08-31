import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import api from '../../hooks/axios_client'
import {
    Container, Row, Col, Card,Alert,
    Button, Form, FormGroup, Label, Input, CardTitle
} from 'reactstrap';
import ReactLoading from 'react-loading'
import  {useFormik} from 'formik';
import * as yup  from 'yup'
import useAuth from '../../hooks/useAuth';

const loginStyle = {
    height: "99vh",
    position: "absolute",
    width: "95vw",
    zIndex: 2,
    backgroundColor: "#ffffff85"
}
function Login() {
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
    const [error, setError] = useState(false)
    const loginFormik = useFormik({
        initialValues: loginInitialValues(),
        validationSchema: yup.object(loginValidationSchema()),
        onSubmit: (formData)=>{
            setLoading(true)
            userLogin(formData)
        },
        onSubmitWithErrors:(e)=>{console.log(e)}
    })
    const registerFormik = useFormik({
        initialValues: registerInitialValues(),
        validationSchema: yup.object(registerValidationSchema()),
        onSubmit: (formData)=>{
            setLoading(true)
            userRegister(formData)
        }

    })
    


    

    const userLogin = (loginData)=>{
        api.post('/login',loginData).then(e=>{
            login(e.data.token)
        }).catch(error=>{
            setError(true)
            setLoading(false)
        })
    }
    const userRegister = (registro)=>{
        api.post('/auth',registro).then(e=>{
            login(e.data.token)
         }).catch(error=>{
            console.log("error")
            console.log(error)
            setLoading(false)
         })
 }


    return (
        <Container>
            {loading?(
                <div  style={loginStyle} className="row align-items-center">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <ReactLoading type={'bubbles'} color={'#00b0ff'} height={'20%'} width={'20%'} />
                        </div>
                    </div>
                </div>
            ):null}
            
            <Row>
                <Col lg={6}>
                    <Image src="/pet_a.svg" layout="fill"/>
                </Col>
                <Col lg={6} className='d-flex align-items-center' style={{height: '100vh'}}>
                    {loginForm?(
                        <Card style={{padding:10, width: '100%'}}>
                            <Image src="/profile_avatar.svg" width={100} height={100}/>
                            <CardTitle className={'text-center'} tag="h4">Bienvenido</CardTitle>
                            <Form  onSubmit={loginFormik.handleSubmit}>
                                <FormGroup>
                                    <Label for="loginEmail">Email</Label>
                                    <Input type="text" invalid={loginFormik.errors.email?true:false}  onChange={loginFormik.handleChange} name="email" id="loginEmail" placeholder="Ingrese Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="loginPassword">Contraseña</Label>
                                    <Input type="password" invalid={loginFormik.errors.password?true:false}  onChange={loginFormik.handleChange} name="password" id="loginPassword" placeholder="Ingrese Contraseña" />
                                </FormGroup>
                                
                                <div className="row justify-content-evenly" style={{paddingBottom: "15px"}}>
                                    <div className="col">
                                        <Button type='submit' >Ingresar</Button>
                                    </div>
                                    <div className="col d-flex justify-content-end">
                                        <label style={{color: "blue"}} onClick={()=>setLoginForm(false)}> Registrate</label>
                                    </div>
                                </div>
                            </Form>
                            
                            {error?(
                                <Alert color="danger">
                                    Email o contraseña Incorrectos
                                </Alert>
                            ):null}
                            
                        </Card>
                    ):(
                        <Card style={{padding:10, width: '100%'}}>
                            <Image src="/profile_avatar.svg" width={100} height={100}/>
                            <CardTitle className={'text-center'} tag="h4">Bienvenido</CardTitle>
                            <Form onSubmit={registerFormik.handleSubmit}>
                                <FormGroup>
                                    <Label for="registerName">Nombre</Label>
                                    <Input type="text" invalid={registerFormik.errors.nombre?true:false}  onChange={registerFormik.handleChange} name="nombre" id="registerName" placeholder="Ingrese nombre" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="registerEmail">Email</Label>
                                    <Input type="text" invalid={registerFormik.errors.email?true:false}    onChange={registerFormik.handleChange} name="email" id="registerEmail" placeholder="Ingrese Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="registerPassword">Contraseña</Label>
                                    <Input type="password"  invalid={registerFormik.errors.password?true: false}   onChange={registerFormik.handleChange} name="password" id="registerPassword" placeholder="Ingrese contraseña" />
                                </FormGroup>
                                <div className="row justify-content-evenly" style={{paddingBottom: "15px"}}>
                                    <div className="col">
                                        <Button type='submit' >Registrase</Button>
                                    </div>
                                    <div className="col d-flex justify-content-end">
                                        <label style={{color: "blue"}} onClick={()=>setLoginForm(true)}> Ingresar</label>
                                    </div>
                                </div>
                            </Form>
                        </Card>
                    )}
                    

                </Col>
            </Row>
        </Container>
    )
}

export default Login;

function loginInitialValues(){
    return {
        email: "",
        password:""
    }
}
function registerInitialValues(){
    return {
        nombre: "", 
        email: "",
        password:""
    }
}

function loginValidationSchema(){
    return{
        email: yup.string().email().required(true),
        password: yup.string().required(true)
    }
}
function registerValidationSchema(){
    return{
        nombre: yup.string().required(true),
        email: yup.string().email().required(true),
        password: yup.string().required(true)
    }
}