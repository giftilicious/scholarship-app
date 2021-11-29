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

    return (
      <>
      <Navbar variant="dark" bg="dark" expand="sm">
		 		<Container fluid>
         <Navbar.Brand>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
              {Auth.loggedIn() ? (
                <Nav>
                  <Link href="#" className="btn text-white" to="/">Home</Link>
                  <Link href="#" className="btn text-white" to="/collection">Collections</Link>
                  <Link href="#" className="btn text-white" to="/library">Library</Link>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <img src="http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png" alt="Pfp" style={{width:'40px'}} class="rounded-pill" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#action/3.2">Theme</Dropdown.Item>
                      <Dropdown.Item onClick={logout} to="/">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              ) : (
                <Nav>
                  <Link href="#" className="btn text-white" to="/signup">Sign up</Link>
                  <Link href="#" className="btn text-white" to="/login">Log in</Link>
                </Nav>
              )}
            </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    )
}


export default Navibar