import { Button, Card, Col, Input, message, Row } from "antd";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function ViewShipment() {
    const [trackingId, setTrackingId] = useState("");
    const [shipmentDetails, setShipmentDetails] = useState(null);
    const [couriers, setCouriers] = useState([]);

    useEffect(() => {
        const savedCouriers = localStorage.getItem("courierData");
        if (savedCouriers) {
            setCouriers(JSON.parse(savedCouriers));
        }
    }, []);

    const handleSearch = () => {
        const trimmedId = trackingId.trim();
        if (!trimmedId) {
            message.warning("Please enter a CN Number.");
            return;
        }

        const matchedCourier = couriers.find(
            (courier) => courier.cnnumber.toLowerCase() === trimmedId.toLowerCase()
        );

        if (matchedCourier) {
            setShipmentDetails(matchedCourier);
            message.success("Shipment details found!");
        } else {
            setShipmentDetails(null);
            message.error("Shipment not found.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center"    >
            <Container>
                <Row className="d-flex justify-content-center align-items-center" >
                    <Col span={8}>
                        <Card className="p-4 border-black">
                            <h1 >Track Rider</h1>
                            <Input type="text" placeholder="Enter CN Number" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} onKeyDown={handleKeyPress} />
                            <Button variant="solid" type="primary" className="mt-3" onClick={handleSearch}>
                                Search
                            </Button>
                            {shipmentDetails ? (
                                <Card className="border-1 border-black mt-2">
                                    <div className="my-4">
                                        <h2 className="my-2">Shipment Details</h2>
                                        <p><b>CN Number:</b> {shipmentDetails.cnnumber}</p>
                                        <p><b>Consignee:</b> {shipmentDetails.consignee}</p>
                                        <p><b>Rider:</b> {shipmentDetails.rider}</p>
                                        <p><b>Date Added:</b> {new Date(shipmentDetails.createdAt).toLocaleString()}</p>
                                    </div>
                                </Card>
                            ) : (
                                <p className="mt-3 text-muted">Enter a CN Number to search.</p>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default ViewShipment;
