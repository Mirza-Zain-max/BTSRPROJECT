import React from 'react';
import { Layout, Menu} from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import ViewShipment from '../../Pages/DashBoard/ViewShipment';
import ListShipments from '../../Pages/DashBoard/ListShipments';
import AddShipment from '../../Pages/DashBoard/AddShipment';
import UpdateShipment from '../../Pages/DashBoard/UpdateShipment';
import Dahboard from '../../Pages/DashBoard/Dashboard';
import Rider from '../../Pages/DashBoard/Rider';
import RiderList from '../../Pages/DashBoard/RiderList';

const { Header, Footer } = Layout;

// Define menu items with route paths
const items = [
    { key: '1', label: <Link className='nav-link' to="/">DashBoard</Link> },
    { key: '2', label: <Link className='nav-link' to="/addshipment">AddShipment</Link> },
    { key: '3', label: <Link className='nav-link' to="/listshipment">ListShipments</Link> },
    { key: '4', label: <Link className='nav-link' to="/updateshipment">UpdateShipment</Link> },
    { key: '5', label: <Link className='nav-link' to="/viewshipment">ViewShipment</Link> },
    { key: '6', label: <Link className='nav-link' to="/rider">Rider</Link> },
    { key: '7', label: <Link className='nav-link' to="/riderlist">RiderList</Link> },
];

// Define your page components
// const Home = () => <div>Welcome to the Home Page</div>;
// const About = () => <div>About Us</div>;
// const Services = () => <div>Our Services</div>;
// const Contact = () => <div>Contact Us</div>;
// const Help = () => <div>Help Section</div>;
// const Help = () => <div>Help Section</div>;

const Header1 = () => {
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    return (

        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} style={{ flex: 1, minWidth: 0 }} />
            </Header>
            <Routes>
                <Route path="/" element={<Dahboard />} />
                <Route path="/addshipment" element={<AddShipment />} />
                <Route path="/listshipment" element={<ListShipments />} />
                <Route path="/updateshipment" element={<UpdateShipment />} />
                <Route path="/viewshipment" element={<ViewShipment />} />
                <Route path="/rider" element={<Rider />} />
                <Route path="/riderlist" element={<RiderList />} />
            </Routes>
            {/* <Content style={{ padding: '0 48px' }}> */}
            {/* <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    > */}
            {/* Define your routes here */}
            {/* </div> */}
            {/* </Content> */}
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default Header1;
