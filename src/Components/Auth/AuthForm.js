import React, { Component } from 'react'
import { Formik } from 'formik';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { auth } from '../../redux/authActionCreator';
import { connect } from 'react-redux';


const mapDispatchToProps=dispatch=>{
    return{
        auth:(email,password)=>dispatch(auth(email,password))
    }
}

class AuthForm extends Component {
    render() {
        return (
            <div>
               <Formik 
                    initialValues={
                        {email:"",Password:"",ConfirmPassWord:""}
                    }
                    onSubmit={
                        (values)=>{
                            this.props.auth(values.email,values.Password,"signup")
                        }
                    }

                    validate={
                        (values)=>{
                            const errors={}

                            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(values.email)){
                                errors.email="Invalid email address"
                            }

                            if(values.Password !== values.ConfirmPassWord){
                                errors.ConfirmPassWord = "Password field does not match"
                            }

                            if(values.Password<6){
                                errors.Password = "Password Must be at lest 6 characters"
                            }
                            return errors;
                        }
                    }
                >

                    {({errors,handleChange,handleSubmit})=>(
                        <div className="col-md-8 mt-5 p-5 mx-auto" style={{border:"2px solid #ECECEC"}}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
                                    {errors.email}
                                </Form.Group>

                                <Form.Group className="mb-4" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="Password" placeholder="Password must be at least 6 characters" onChange={handleChange} required />
                                    {errors.Password}
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="ConfirmPassWord" placeholder="Confirm Password" onChange={handleChange} required />
                                    {errors.ConfirmPassWord}
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" type="submit" style={{width:"300px",fontSize:"20px"}}>
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="mt-4 text-center">
                                    <h6>Already have an accoun ?
                                    <Link to={"/login"} style={{textDecoration:"none"}}> Log In</Link></h6>
                                </div>
                            </Form>

                        </div>
                    )}

               </Formik>
            </div>
        )
    }
}

export default connect(null,mapDispatchToProps) (AuthForm);