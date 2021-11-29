import React from 'react'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

const Navibar = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };
      console.log(Auth.getUser())

    return (
      <>
      <Navbar variant="dark" bg="dark" expand="sm" sticky="top">
		 		<Container fluid>
         <Navbar.Brand>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example" className="">
              {Auth.loggedIn() ? (
                <Nav className="justify-content-between align-items-center w-100">

                  <div>
                  <Link href="#" className="btn" to="/">Home</Link>
                  {Auth.getUser().data.usertype==='Provider' ? (
                    <>
                    <Link href="#" className="btn" to="/provideScholarship">Provide Scholarship</Link>
                    <Link href="#" className="btn" to="/library">Library</Link>
                    </>
                  ):( 
                    <Link href="#" className="btn" to="/collection">Collection</Link>
                  )}
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <img src="http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png" alt="Pfp" style={{width:'40px'}} class="rounded-pill" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu menuVariant="light" align="end">
                      <Dropdown.Item href="#action/3.2">Theme</Dropdown.Item>
                      <Dropdown.Item onClick={logout} to="/">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </Nav>
              ) : (
                <Nav className="justify-content-end w-100">
                  <Link href="#" id="sign-up" className="btn login-screen-btns" to="/signup">Sign up</Link>
                  <Link href="#" id="log-in" className="btn login-screen-btns" to="/login">Log in</Link>
                </Nav>
              )}
            </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    )
}


export default Navibar