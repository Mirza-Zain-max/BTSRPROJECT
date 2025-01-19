// import React from 'react';
// import { Layout, Menu} from 'antd';
// import { Routes, Route, Link } from 'react-router-dom';
// import ViewShipment from '../../Pages/DashBoard/ViewShipment';
// import ListShipments from '../../Pages/DashBoard/ListShipments';
// // import AddShipment from '../../Pages/DashBoard/AddShipment';
// // import UpdateShipment from '../../Pages/DashBoard/UpdateShipment';
// // import Dahboard from '../../Pages/DashBoard/Dashboard';
// import Rider from '../../Pages/DashBoard/Rider';
// import RiderList from '../../Pages/DashBoard/RiderList';
// import ExcelSheet from '../../Pages/DashBoard/ExcelSheet';
// // import RiderExcelSheet from '../../Pages/DashBoard/RiderExcelSheet';

// const { Header} = Layout;

// // Define menu items with route paths
// const items = [
//     // { key: '1', label: <Link className='text-dark nav-link' to="/">DashBoard</Link> },
//     // { key: '1', label: <Link className='nav-link text-center' to="/">AddShipment</Link> },
//     { key: '2', label: <Link className='nav-link text-center' to="/listshipment">ListShipments</Link> },
//     { key: '3', label: <Link className='nav-link text-center' to="/excelsheet">ExcelSheet</Link> },
//     // { key: '4', label: <Link className='nav-link text-center' to="/updateshipment">UpdateShipment</Link> },
//     { key: '4', label: <Link className='nav-link text-center' to="/viewshipment">Tracking</Link> },
//     { key: '5', label: <Link className='nav-link text-center' to="/rider">Rider</Link> },
//     { key: '6', label: <Link className='nav-link text-center' to="/riderlist">Delivery Sheet</Link> },
//     // { key: '7', label: <Link className='nav-link' to="/riderExcelSheet">RiderExcelSheet</Link> },
// ];

// // Define your page components
// // const Home = () => <div>Welcome to the Home Page</div>;
// // const About = () => <div>About Us</div>;
// // const Services = () => <div>Our Services</div>;
// // const Contact = () => <div>Contact Us</div>;
// // const Help = () => <div>Help Section</div>;
// // const Help = () => <div>Help Section</div>;

// const Header1 = () => {
//     // const {
//     //     token: { colorBgContainer, borderRadiusLG },
//     // } = theme.useToken();

//     return (

//         <Layout>
//             <Header style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="demo-logo" />
//                 <Menu theme="dark" mode="horizontal" items={items} style={{ flex: 1, minWidth: 0 }} />
//             </Header>
//             <Routes>
//                 {/* <Route path="/" element={<Dahboard />} /> */}
//                 {/* <Route path="/" element={<AddShipment />} /> */}
//                 <Route path="/listshipment" element={<ListShipments />} />
//                 <Route path='/excelsheet' element={<ExcelSheet/>}/>
//                 {/* <Route path="/updateshipment" element={<UpdateShipment />} /> */}
//                 <Route path="/viewshipment" element={<ViewShipment />} />
//                 <Route path="/rider" element={<Rider />} />
//                 <Route path="/riderlist" element={<RiderList />} />
//                 {/* <Route path="/riderExcelSheet" element={<RiderExcelSheet />} /> */}
//             </Routes>
//             {/* <Content style={{ padding: '0 48px' }}> */}
//             {/* <div
//                         style={{
//                             background: colorBgContainer,
//                             minHeight: 280,
//                             padding: 24,
//                             borderRadius: borderRadiusLG,
//                         }}
//                     > */}
//             {/* Define your routes here */}
//             {/* </div> */}
//             {/* </Content> */}
//             {/* <Footer style={{ textAlign: 'center' }}>
//                 Ant Design ©{new Date().getFullYear()} Created by Ant UED
//             </Footer> */}
//         </Layout>
//     );
// };

// export default Header1;
// import React from 'react';
// import { Layout, Menu, Dropdown } from 'antd';
// import { Routes, Route, Link } from 'react-router-dom';
// import ViewShipment from '../../Pages/DashBoard/ViewShipment';
// import ListShipments from '../../Pages/DashBoard/ListShipments';
// import Rider from '../../Pages/DashBoard/Rider';
// import RiderList from '../../Pages/DashBoard/RiderList';
// import ExcelSheet from '../../Pages/DashBoard/ExcelSheet';
// import { DownOutlined } from '@ant-design/icons';

// const { Header } = Layout;

// const Header1 = () => {
//     // Define the dropdown menu content for "Delivery"
//     const deliveryMenu = (
//         <Menu>
//             <Menu.Item key="1">
//                 <Link className="nav-link fw-bolder text-center" to="/new-delivery-sheet">New Delivery Sheet</Link>
//             </Menu.Item>
//             <Menu.Item key="2">
//                 <Link className="nav-link fw-bolder text-center" to="/update-delivery-sheet">Update Delivery Sheet</Link>
//             </Menu.Item>
//             <Menu.Item key="3">
//                 <Link className="nav-link fw-bolder text-center" to="/view-delivery-sheet">View Delivery Sheet</Link>
//             </Menu.Item>
//         </Menu>
//     );

//     // Define the dropdown menu content for "Rider"
//     const riderMenu = (
//         <Menu>
//             <Menu.Item key="4">
//                 <Link className="nav-link fw-bolder " to="/rider">Add Rider</Link>
//             </Menu.Item>
//             {/* <Menu.Item key="5">
//                 <Link className="nav-link fw-bolder text-center" to="/update-rider">Update Rider</Link>
//             </Menu.Item> */}
//             <Menu.Item key="5">
//                 <Link className="nav-link fw-bolder text-center" to="/listshipment">View Riders</Link>
//             </Menu.Item>
//         </Menu>
//     );

//     // Define other menu items
//     const items = [
//         // { key: '2', label: <Link className="nav-link text-center" to="/listshipment">ListShipments</Link> },
//         // { key: '2', label: <Link className="nav-link text-center" to="/excelsheet">Rider List</Link> },
//         { key: '3', label: <Link className="nav-link text-center" to="/viewshipment">Tracking</Link> },
//     ];

//     return (
//         <Layout>
//             <Header  className=" text-danger d-flex justify-content-center align-items-center"style={{ display: 'flex', alignItems: 'flex-start' , justifyContent: "flex-start" }}>
//                 <div className="demo-logo" />
//                 <Menu theme="dark" mode="horizontal" items={items} style={{  minWidth: 120 }} />
//                 <Dropdown overlay={deliveryMenu}>
//                     <span className="nav-link text-danger d-flex justify-content-center align-items-center" style={{ color: '#fff', cursor: 'pointer' }}>
//                         Delivery <DownOutlined />
//                     </span>
//                 </Dropdown>
//                 <Dropdown overlay={riderMenu}>
//                     <span className="nav-link text-center" style={{ color: '#fff', cursor: 'pointer' }}>
//                         Rider <DownOutlined />
//                     </span>
//                 </Dropdown>
//             </Header>
//             <Routes>
//                 <Route path="/listshipment" element={<ListShipments />} />
//                 <Route path="/excelsheet" element={<ExcelSheet />} />
//                 <Route path="/viewshipment" element={<ViewShipment />} />
//                 <Route path="/rider" element={<Rider />} />
//                 <Route path="/riderlist" element={<RiderList />} />
//                 {/* Add routes for Delivery */}
//                 <Route path="/new-delivery-sheet" element={<div>New Delivery Sheet Page</div>} />
//                 <Route path="/update-delivery-sheet" element={<div>Update Delivery Sheet Page</div>} />
//                 <Route path="/view-delivery-sheet" element={<div>View Delivery Sheet Page</div>} />
//                 {/* Add routes for Rider */}
//                 <Route path="/add-rider" element={<div>Add Rider Page</div>} />
//                 <Route path="/update-rider" element={<div>Update Rider Page</div>} />
//                 <Route path="/riderlist" element={<div>View Riders Page</div>} />
//             </Routes>
//         </Layout>
//     );
// };

// export default Header1;


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
// import CPage from '../../Pages/DashBoard/Cpage';

function Header1() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        {/* <Link className='nav-link' to="/">React-Bootstrap</Link> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link className='nav-link' to="/"></Link> */}
            <Link className='nav-link text-light' to="/viewShipment">Tracking</Link>
            {/* <Link className='nav-link text-light' to="/listShipment">Tracking</Link> */}
            <NavDropdown title="Delivery" id="basic-nav-dropdown">
              {/* <Link className=' text-dark nav-link' to="/">Add Rider</Link> <hr />
              <Link className=' text-dark nav-link' to="/riderlist">
                UpDate Rider
              </Link><hr /> */}
              <Link className=' text-dark nav-link' to="/veiwrider">Run Sheet</Link>
              <Link className=' text-dark nav-link' to="/riderlist">Veiw Sheet</Link>
              <Link className=' text-dark nav-link' to='/showData'>Show Data</Link>
              <Link className=' text-dark nav-link' to='/cPage'>Show Data</Link>
            </NavDropdown>
            <NavDropdown title="Rider" id="basic-nav-dropdown">
              <Link className='text-dark nav-link' to="/">Add Rider</Link>
              <Link className='text-dark nav-link' to="/riderlist">
                UpDate Rider
              </Link>
              {/* <Link className='text-dark nav-link' to="/veiwrider">Veiw Sheet</Link> */}
              {/* <NavDropdown.Item to="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header1;