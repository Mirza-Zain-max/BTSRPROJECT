import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import ViewShipment from '../ViewShipment';
import ListShipments from '../ListShipments';
import AddShipment from '../AddShipment';
import UpdateShipment from '../UpdateShipment';
import Dahboard from '../Dashboard';
import Rider from '../Rider';

const { Header, Footer } = Layout;

// Define menu items with route paths
const items = [
    { key: '1', label: <Link to="/">DashBoard</Link> },
    { key: '2', label: <Link to="/addshipment">AddShipment</Link> },
    { key: '3', label: <Link to="/updateshipment">UpdateShipment</Link> },
    { key: '4', label: <Link to="/viewshipment">ViewShipment</Link> },
    { key: '5', label: <Link to="/listshipment">ListShipments</Link> },
    { key: '6', label: <Link to="/rider">Rider</Link> },
];

// Define your page components
// const Home = () => <div>Welcome to the Home Page</div>;
// const About = () => <div>About Us</div>;
// const Services = () => <div>Our Services</div>;
// const Contact = () => <div>Contact Us</div>;
// const Help = () => <div>Help Section</div>;
// const Help = () => <div>Help Section</div>;

const Header1 = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
       
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={items}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </Header>
                        <Routes>
                            <Route path="/" element={<Dahboard />} />
                            <Route path="/addshipment" element={<AddShipment />} />
                            <Route path="/updateshipment" element={<UpdateShipment />} />
                            <Route path="/viewshipment" element={<ViewShipment />} />
                            <Route path="/listshipment" element={<ListShipments />} />
                            <Route path="/rider" element={<Rider />} />
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
