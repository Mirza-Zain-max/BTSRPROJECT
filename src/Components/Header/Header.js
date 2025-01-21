// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header1() {
  return (
    // <Navbar expand="lg" className="bg-dark navbar-dark p-3">
    //   <Container>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Link className='text-light nav-link' to="/">Add Rider</Link>
    //         {/* <Link className='text-light nav-link' to="/listshipment">New</Link>
    //         <Link className='text-light nav-link' to="/listshipment">New</Link> */}
    //         <NavDropdown title="Delivery" id="basic-nav-dropdown">
    //           <Link className=' text-dark nav-link' to="/runSheet">Run Sheet</Link>
    //           <Link className=' text-dark nav-link' to="/viewSheet">Veiw Sheet</Link>
    //           <Link className=' text-dark nav-link' to='/showData'>Show Data</Link>
    //           <Link className=' text-dark nav-link' to='/cPage'>Show Data</Link>
    //         </NavDropdown>
    //         <Link className='nav-link text-light' to="/tracking">Tracking</Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
     <Navbar expand="lg" className="bg-dark navbar-dark p-3">
       <Container>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
      <Link className='text-light nav-link mx-3 ' to="/">Add Rider</Link>
      <Link className='text-light nav-link mx-3 ' to="/make-delivery"> Delivery Sheet</Link>
      <Link className='text-light nav-link mx-3 ' to="/track-shipment">Track Shipment</Link>
      <Link className='text-light nav-link mx-3 ' to="/view-sheet">View Sheet</Link>
      <Link className='text-light nav-link ms-3 ' to="/download-upload">Download</Link>
      </Navbar.Collapse>
   </Container>
    </Navbar>

  );
}

export default Header1;