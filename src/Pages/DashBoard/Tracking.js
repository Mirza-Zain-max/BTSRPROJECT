// import { Button, Card, Col, Input, message, Row } from "antd";
// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";

// function Tracking() {
//     const [trackingId, setTrackingId] = useState("");
//     const [shipmentDetails, setShipmentDetails] = useState(null);
//     const [couriers, setCouriers] = useState([]);

//     useEffect(() => {
//         const savedCouriers = localStorage.getItem("courierData");
//         if (savedCouriers) {
//             setCouriers(JSON.parse(savedCouriers));
//         }
//     }, []);

//     const handleSearch = () => {
//         const trimmedId = trackingId.trim();
//         if (!trimmedId) {
//             message.warning("Please enter a CN Number.");
//             return;
//         }

//         const matchedCourier = couriers.find(
//             (courier) => courier.cnnumber.toLowerCase() === trimmedId.toLowerCase()
//         );

//         if (matchedCourier) {
//             setShipmentDetails(matchedCourier);
//             message.success("Shipment details found!");
//         } else {
//             setShipmentDetails(null);
//             message.error("Shipment not found.");
//         }
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === "Enter") {
//             handleSearch();
//         }
//     };

//     return (
//         <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center"    >
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center" >
//                     <Col span={8}>
//                         <Card className="p-4 border-black">
//                             <h1 >Track Rider</h1>
//                             <Input type="text" placeholder="Enter CN Number" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} onKeyDown={handleKeyPress} />
//                             <Button variant="solid" type="primary" className="mt-3" onClick={handleSearch}>
//                                 Search
//                             </Button>
//                             {shipmentDetails ? (
//                                 <Card className="border-1 border-black mt-2">
//                                     <div className="my-4">
//                                         <h2 className="my-2">Shipment Details</h2>
//                                         <p><b>CN Number:</b> {shipmentDetails.cnnumber}</p>
//                                         <p><b>Consignee:</b> {shipmentDetails.consignee}</p>
//                                         <p><b>Rider:</b> {shipmentDetails.rider}</p>
//                                         <p><b>Date Added:</b> {new Date(shipmentDetails.createdAt).toLocaleString()}</p>
//                                     </div>
//                                 </Card>
//                             ) : (
//                                 <p className="mt-3 text-muted">Enter a CN Number to search.</p>
//                             )}
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// }

// export default Tracking;


// import React, { useState} from "react";
// import { Button, Card, Col, Input, message, Row } from "antd";
// import "antd/dist/reset.css"; // Ensure Ant Design styles are loaded

// function Tracking() {
// const [trackingId, setTrackingId] = useState(""); // CN Number entered by the user
// const [shipmentDetails, setShipmentDetails] = useState(null); // Details of the matched shipment
// const [couriers, setCouriers] = useState([]); // List of couriers from localStorage

// // Load couriers from localStorage on component mount
// useEffect(() => {
//     const savedCouriers = localStorage.getItem("courierData");
//     if (savedCouriers) {
//         setCouriers(JSON.parse(savedCouriers)); // Parse and set couriers data
//     } else {
//         // Fallback: Set default data for testing purposes
//         setCouriers([
//             {
//                 cnnumber: "12345",
//                 consignee: "John Doe",
//                 rider: "Rider A",
//                 createdAt: "2025-01-01T12:00:00Z",
//             },
//             {
//                 cnnumber: "67890",
//                 consignee: "Jane Smith",
//                 rider: "Rider B",
//                 createdAt: "2025-01-05T14:00:00Z",
//             },
//         ]);
//     }
// }, []);

// // Handle search logic when the button is clicked or Enter is pressed
// const handleSearch = () => {
//     const trimmedId = trackingId.trim(); // Remove extra spaces
//     if (!trimmedId) {
//         message.warning("Please enter a CN Number.");
//         return;
//     }

//     // Use optional chaining to avoid errors when accessing undefined properties
//     const matchedCourier = couriers.find(
//         (courier) => courier?.cnnumber?.toLowerCase() === trimmedId.toLowerCase()
//     );

//     if (matchedCourier) {
//         setShipmentDetails(matchedCourier); // Set details of the matched shipment
//         message.success("Shipment details found!");
//     } else {
//         setShipmentDetails(null); // Clear details if no match is found
//         message.error("Shipment not found.");
//     }
// };

// // Handle the Enter key press to trigger the search
// const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//         handleSearch();
//     }
// };

//     return (
//         <main
//             style={{ height: "100vh" }}
//             className="d-flex justify-content-center align-items-center"
//         >
//             <div style={{ width: "100%", maxWidth: "600px", padding: "20px" }}>
//                 <Card className="p-4">
//                     <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
//                         Track Rider
//                     </h1>
//                     <Input
//                         type="text"
//                         placeholder="Enter CN Number"
//                         value={trackingId}
//                         onChange={(e) => setTrackingId(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                     />
//                     <Button
//                         type="primary"
//                         className="mt-3"
//                         style={{ width: "100%" }}
//                         onClick={handleSearch}
//                     >
//                         Search
//                     </Button>
//                     {shipmentDetails ? (
//                         <Card className="border mt-4">
//                             <h2>Shipment Details</h2>
//                             <p>
//                                 <b>CN Number:</b> {shipmentDetails.cnnumber}
//                             </p>
//                             <p>
//                                 <b>Consignee:</b> {shipmentDetails.consignee}
//                             </p>
//                             <p>
//                                 <b>Rider:</b> {shipmentDetails.rider}
//                             </p>
//                             <p>
//                                 <b>Date Added:</b>{" "}
//                                 {new Date(shipmentDetails.createdAt).toLocaleString()}
//                             </p>
//                         </Card>
//                     ) : (
//                         <p className="mt-3 text-muted">
//                             Enter a CN Number to search.
//                         </p>
//                     )}
//                 </Card>
//             </div>
//         </main>
//     );
// }

// import { Button, Card, Col, Input, message, Row, Typography } from "antd";
// import React, { useState } from "react";
// import { Container, Table } from "react-bootstrap";

// const TrackShipment = () => {
//     const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//     const { Title, Paragraph } = Typography;
//     const [trackCN, setTrackCN] = useState('');
//     const [trackResult, setTrackResult] = useState(null);

//     const handleTrackCNChange = (e) => {
//         setTrackCN(e.target.value);
//     };

//     const trackShipment = () => {
//         const result = deliveries.find(delivery => delivery.cnNumber === trackCN);
//         if (result) {
//           setTrackResult(result); // Set the result in state
//           message.success("Rider Found Successful")
//         } else {
//           setTrackResult(null); // Clear the result if not found
//         message.error("Rider Not Found ")
//         }
//       };
//       const handleSearch = () => {
//             const trimmedId = trackingId.trim(); // Remove extra spaces
//             if (!trimmedId) {
//                 message.warning("Please enter a CN Number.");
//                 return;
//             }

//             // Use optional chaining to avoid errors when accessing undefined properties
//             const matchedCourier = couriers.find(
//                 (courier) => courier?.cnnumber?.toLowerCase() === trimmedId.toLowerCase()
//             );

//             if (matchedCourier) {
//                 setShipmentDetails(matchedCourier); // Set details of the matched shipment
//                 message.success("Shipment details found!");
//             } else {
//                 setShipmentDetails(null); // Clear details if no match is found
//                 message.error("Shipment not found.");
//             }
//         };
//       const handleKeyPress = (event) => {
//             if (event.key === "Enter") {
//                 handleSearch();
//             }
//         }
//     return (
//        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
//          <Container>
//             <Row className="d-flex justify-content-center align-items-center">
//                 <Col span={24}>
//                     <Card>
//                         <Title level={1}>Track Shipment</Title>
//                         <label className="fw-bolder mb-4">Enter CN Number:</label>
//                         <Input className="mb-4" type="text" onKeyDown={handleKeyPress} value={trackCN} onChange={handleTrackCNChange} />
//                         <Button className="w-25 p-3" type="primary" onClick={trackShipment}>Track</Button>

//       {trackResult ? (
//         <Table border="3" bordered style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>Rider</th>
//               <th>Date</th>
//               <th>Consignee Name</th>
//               <th>Reciver Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{trackResult.rider}</td>
//               <td>{trackResult.date}</td>
//               <td>{trackResult.consigneeName}</td>
//             </tr>
//           </tbody>
//         </Table>
//       ) : trackCN && (
//         <p style={{ color: 'red', marginTop: '20px' }}>No delivery found with this CN Number.</p>
//       )}
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//        </main>
//     );
// };


// export default TrackShipment;

import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

const TrackShipment = () => {
    const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
    const { Title } = Typography;
    const [trackCN, setTrackCN] = useState('');
    const [trackResult, setTrackResult] = useState(null);

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
            setTrackResult(result);
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
                                <Table
                                    border="3"
                                    bordered
                                    style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}
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
                                            <td>{trackResult.rider}</td>
                                            <td>{trackResult.date}</td>
                                            <td>{trackResult.cnNumber}</td>
                                            <td>{trackResult.consigneeName}</td>
                                            <td></td> {/* Placeholder for Receiver Name */}
                                        </tr>
                                    </tbody>
                                </Table>
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
