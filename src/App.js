import { Navbar, Container, Nav } from 'react-bootstrap'
import {Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import UserIndex from './pages/users/Index'
import UserCreate from './pages/users/Create'
import UserEdit from './pages/users/Edit'

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">EXPRESS.JS + REACT.JS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/" className="nav-link">HOME</Nav.Link>
                  <Nav.Link as={Link} to="/users" className="nav-link">USERS</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserIndex />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/edit/:user_id" element={<UserEdit />} />
      </Routes>
      
    </div>
  );
}
export default App;