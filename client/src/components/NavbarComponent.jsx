import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './component.css'

import UserContext from '../context/UserContext';
import { useContext } from 'react';
import {MoonStars , BrightnessHigh} from'react-bootstrap-icons'

function NavbarComponent() {

  const { user , logout , toggleDarkMode , darkMode} = useContext(UserContext)

  async function logoutHandler(ev) {
    ev.preventDefault()
    try {
      await logout()
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link className='remove-underline' to="/"><Navbar.Brand>Code bavarchi</Navbar.Brand></Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className='remove-underline' to="/admin/dashboard"><Nav.Link as={"span"}>Admin Panel</Nav.Link></Link>
            <Link className='remove-underline' to="/submissions"><Nav.Link as={"span"}>Submissions</Nav.Link></Link>
            {/* <Nav.Link href="#action2">Coming soon</Nav.Link> */}
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Coming soon</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Coming soon
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Coming soon
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Coming soon
            </Nav.Link>
          </Nav>
            <button onClick={toggleDarkMode} className='btn'>{darkMode ? <MoonStars size={25} /> : <BrightnessHigh size={25} /> }</button>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
            {user ? null : (
              <>
                <Link to="/signup">
                  <Button variant="outline-primary">Signup</Button>
                </Link><span className='m-1'></span>
                <Link to="/login">
                  <Button variant="outline-success">Login</Button>
                </Link>
              </>
            )}

            {user ? (
              <>  
                  <h4 className='m-2 tw-font-semibold tw-text-lg'>@{user.username}</h4>
                  <Button onClick={logoutHandler} variant="outline-danger">Logout</Button>            
              </>
            ):null}


          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;