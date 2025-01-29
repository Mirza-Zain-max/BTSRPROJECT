

// import { Button, Card, Col, Input, message, Row, Typography } from "antd";
// import React, { useState } from "react";
// import { Container, Table } from "react-bootstrap";

// const TrackShipment = () => {
//     const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//     const [riders, setRiders] = useState(JSON.parse(localStorage.getItem("riders")) || []);
//     const { Title } = Typography;
//     const [trackCN, setTrackCN] = useState('');
//     const [trackResult, setTrackResult] = useState(null);

//     const handleTrackCNChange = (e) => {
//         setTrackCN(e.target.value);
//     };

//     const trackShipment = () => {
//         if (!trackCN.trim()) {
//             message.warning("Please enter a CN Number.");
//             return;
//         }
        
//         const result = deliveries.find(delivery => delivery.cnNumber === trackCN.trim());
//         if (result) {
//             const rider = riders.find(r => r.id === result.ridername);
//             setTrackResult({ ...result, riderName: rider ? rider.name : "Unknown" });
//             message.success("Delivery found successfully!");
//         } else {
//             setTrackResult(null);
//             message.error("No delivery found with this CN Number.");
//         }
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === "Enter") {
//             trackShipment();
//         }
//     };

//     return (
//         <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center">
//                     <Col span={24}>
//                         <Card>
//                             <Title level={1}>Track Shipment</Title>
//                             <label className="fw-bolder mb-4">Enter CN Number:</label>
//                             <Input
//                                 className="mb-4"
//                                 type="text"
//                                 value={trackCN}
//                                 onChange={handleTrackCNChange}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Enter CN Number"
//                             />
//                             <Button
//                                 className="w-25 p-3"
//                                 type="primary"
//                                 onClick={trackShipment}
//                             >
//                                 Track
//                             </Button>

//                             {trackResult ? (
//                                 <Table
//                                     border="3"
//                                     bordered
//                                     style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}
//                                 >
//                                     <thead>
//                                         <tr>
//                                             <th>Rider</th>
//                                             <th>Date</th>
//                                             <th>CN Number</th>
//                                             <th>Consignee Name</th>
//                                             <th>Receiver Name</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>{trackResult.riderName}</td>
//                                             <td>{trackResult.date}</td>
//                                             <td>{trackResult.cnNumber}</td>
//                                             <td>{trackResult.consigneeName}</td>
//                                             <td>{trackResult.receiverName}</td>
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             ) : trackCN && (
//                                 <p style={{ color: 'red', marginTop: '20px' }}>
//                                     No delivery found with this CN Number.
//                                 </p>
//                             )}
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default TrackShipment;
import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
import { collection, getDocs, query, addDoc } from "firebase/firestore";

const TrackShipment = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [riders, setRiders] = useState([]);
    const { Title } = Typography;
    const [trackCN, setTrackCN] = useState('');
    const [trackResult, setTrackResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch deliveries data
                const deliveriesQuery = query(collection(fireStore, "deliveries"));
                const deliveriesSnapshot = await getDocs(deliveriesQuery);
                const deliveriesList = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDeliveries(deliveriesList);

                // Fetch riders data
                const ridersQuery = query(collection(fireStore, "riders"));
                const ridersSnapshot = await getDocs(ridersQuery);
                const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRiders(ridersList);
            } catch (error) {
                console.error("Error fetching data: ", error);
                message.error("Failed to fetch data from Firestore!");
            }
        };

        fetchData();
    }, []);

    const handleTrackCNChange = (e) => {
        setTrackCN(e.target.value);
    };

    const trackShipment = () => {
        if (!trackCN.trim()) {
            message.warning("Please enter a CN Number.");
            return;
        }
        
        const result = deliveries.find(delivery => delivery.cnNumber === trackCN.trim());
        if (result) {
            const rider = riders.find(r => r.id === result.riderId);
            setTrackResult({ ...result, riderName: rider ? rider.name : "Unknown" });
            message.success("Delivery found successfully!");
        } else {
            setTrackResult(null);
            message.error("No delivery found with this CN Number.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            trackShipment();
        }
    };

    const saveTrackingData = async () => {
        if (!trackResult) {
            message.error("No tracking data to save.");
            return;
        }

        try {
            await addDoc(collection(fireStore, "tracking"), trackResult);
            message.success("Tracking data saved successfully!");
        } catch (error) {
            console.error("Error saving tracking data: ", error);
            message.error("Failed to save tracking data!");
        }
    };

    return (
        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col span={24}>
                        <Card>
                            <Title level={1}>Track Shipment</Title>
                            <label className="fw-bolder mb-4">Enter CN Number:</label>
                            <Input
                                className="mb-4"
                                type="text"
                                value={trackCN}
                                onChange={handleTrackCNChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Enter CN Number"
                            />
                            <Button
                                className="w-25 p-3"
                                type="primary"
                                onClick={trackShipment}
                            >
                                Track
                            </Button>

                            {trackResult ? (
                                <div>
                                    <Table
                                        border="3"
                                        bordered
                                        style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}
                                        rowKey={(record) => record.id} // Ensure unique rowKey
                                    >
                                        <thead>
                                            <tr>
                                                <th>Rider</th>
                                                <th>Date</th>
                                                <th>CN Number</th>
                                                <th>Consignee Name</th>
                                                <th>Receiver Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{trackResult.riderName}</td>
                                                <td>{trackResult.date}</td>
                                                <td>{trackResult.cnNumber}</td>
                                                <td>{trackResult.consigneeName}</td>
                                                <td>{trackResult.receiverName}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button
                                        className="bg-success text-light"
                                        onClick={saveTrackingData}
                                        style={{ marginTop: "1rem" }}
                                    >
                                        Save Tracking Data
                                    </Button>
                                </div>
                            ) : trackCN && (
                                <p style={{ color: 'red', marginTop: '20px' }}>
                                    No delivery found with this CN Number.
                                </p>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default TrackShipment;

// import { Button, Card, Col, Input, message, Row, Typography } from "antd";
// import React, { useState } from "react";
// import { Container, Table } from "react-bootstrap";

// const TrackShipment = () => {
//     const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//         const [riders, setRiders] = useState(JSON.parse(localStorage.getItem("riders")) || []);
//     const { Title } = Typography;
//     const [trackCN, setTrackCN] = useState('');
//     const [trackResult, setTrackResult] = useState(null);

//     const handleTrackCNChange = (e) => {
//         setTrackCN(e.target.value);
//     };

//     const trackShipment = () => {
//         if (!trackCN.trim()) {
//             message.warning("Please enter a CN Number.");
//             return;
//         }
        
//         const result = deliveries.find(delivery => delivery.cnNumber === trackCN.trim());
//         if (result) {
//             setTrackResult(result);
//             message.success("Delivery found successfully!");
//         } else {
//             setTrackResult(null);
//             message.error("No delivery found with this CN Number.");
//         }
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === "Enter") {
//             trackShipment();
//         }
//     };

//     return (
//         <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center">
//                     <Col span={24}>
//                         <Card>
//                             <Title level={1}>Track Shipment</Title>
//                             <label className="fw-bolder mb-4">Enter CN Number:</label>
//                             <Input
//                                 className="mb-4"
//                                 type="text"
//                                 value={trackCN}
//                                 onChange={handleTrackCNChange}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Enter CN Number"
//                             />
//                             <Button
//                                 className="w-25 p-3"
//                                 type="primary"
//                                 onClick={trackShipment}
//                             >
//                                 Track
//                             </Button>

//                             {trackResult ? (
//                                 <Table
//                                     border="3"
//                                     bordered
//                                     style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}
//                                 >
//                                     <thead>
//                                         <tr>
//                                             <th>Rider</th>
//                                             <th>Date</th>
//                                             <th>CN Number</th>
//                                             <th>Consignee Name</th>
//                                             <th>Receiver Name</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>{trackResult.rider}</td>
//                                             <td>{trackResult.date}</td>
//                                             <td>{trackResult.cnNumber}</td>
//                                             <td>{trackResult.consigneeName}</td>
//                                             <td></td> {/* Placeholder for Receiver Name */}
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             ) : trackCN && (
//                                 <p style={{ color: 'red', marginTop: '20px' }}>
//                                     No delivery found with this CN Number.
//                                 </p>
//                             )}
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default TrackShipment;
