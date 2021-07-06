import React from 'react'
import {Navbar,Nav,Form,FormControl,Button,Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navbar.css'
import Logo from '../../assets/image/brand.png'
import { connect } from 'react-redux'

const mapStateToProps = (state)=>{
    return{
        token:state.token,
        userId:state.userId

    }
}


const Navigation=(props)=>{
    let links = null;
    if(props.token!==null){
        links=(
            <Nav className="mx-auto">
                <Nav.Link as={Link} to="/" className="navLink">Home</Nav.Link>
                <Nav.Link as={Link} to="/orders" className="navLink">Orders</Nav.Link>
                {/* <Nav.Link as={Link} to="/signout" className="navLink">Sign Out</Nav.Link> */}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
        )
    }
    else{
        links=(
            <Nav className="mx-auto">
                <Nav.Link as={Link} to="/signup" className="navLink">Sign Up</Nav.Link>
            </Nav>

        )
    }
    return (
        <div className="">
                <Navbar variant="dark" expand="lg" className="navbar">
                    <Navbar.Brand href="/home" style={{paddingLeft:"20px"}}>
                        <Image src={Logo} width="50px" alt="Bite Burger" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {links}
                        <Form className="d-flex">
                            <FormControl type="text" placeholder="Search" className=" me-2" />
                            <Button type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
    )
}
export default connect(mapStateToProps) (Navigation);
