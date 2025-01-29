
// import { Card, Col, Input, Row, Select, Table, Typography, Button, message } from "antd";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";

// const { Option } = Select;
// const { Title } = Typography;

// const ViewSheet = () => {
//   const [riders, setRiders] = useState([]);
//   const [deliveries, setDeliveries] = useState([]);
//   const [deliverySheetData, setDeliverySheetData] = useState([]);
//   const [delivery, setDelivery] = useState({ riderIndex: "", date: "" });

//   useEffect(() => {
//     // Parse data or fallback to empty arrays
//     setRiders(JSON.parse(localStorage.getItem("riders")) || []);
//     setDeliveries(JSON.parse(localStorage.getItem("deliveries")) || []);
//   }, []);

//   const handleDeliveryChange = (name, value) => {
//     setDelivery((prev) => ({ ...prev, [name]: value }));
//   };

//   const viewDeliverySheet = () => {
//     if (!delivery.riderIndex || !delivery.date) {
//       message.error("Please select both rider and date!");
//       return;
//     }

//     const riderName = riders[delivery.riderIndex]?.name || "";
//     const filteredDeliveries = deliveries
//       .filter((d) => d.rider === riderName && d.date === delivery.date)
//       .map((d) => ({
//         ...d,
//         riderName, // Adding rider name for display
//       }));

//     setDeliverySheetData(filteredDeliveries);
//   };

//   const downloadPDFSheet = () => {
//     const doc = new jsPDF();
//     doc.text("Delivery Sheet", 20, 20); // Add a title
//     doc.autoTable({
//       head: [["Rider Name", "CN Number", "Consignee Name" , "Receiver Name", "Date"]],
//       body: deliverySheetData.map((item) => [
//         item.riderName,
//         item.cnNumber,
//         item.consigneeName,
//         item.receiverName,
//         item.date,
//       ]),
//       startY: 30, // Position the table below the title
//     });
//     doc.save("delivery_sheet.pdf");
//   };


//   const columns = [
//     {
//       title: "Rider Name",
//       dataIndex: "riderName",
//       key: "riderName",
//     },
//     {
//       title: "CN Number",
//       dataIndex: "cnNumber",
//       key: "cnNumber",
//     },
//     {
//       title: "Consignee Name",
//       dataIndex: "consigneeName",
//       key: "consigneeName",
//     },
//     {
//       title: "Receiver Name",
//       dataIndex: "receiverName",
//       key: "receiverName",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//   ];

//   return (
//     <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <Container>
//         <Row className="d-flex justify-content-center align-items-center">
//           <Col span={24}>
//             <Card>
//               <Title level={1}>View Delivery Sheet</Title>
//               <label>Select Rider:</label>
//               <Select
//                 name="riderIndex"
//                 value={delivery.riderIndex}
//                 onChange={(value) => handleDeliveryChange("riderIndex", value)}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//                 placeholder="Select a rider"
//               >
//                 {riders.map((rider, index) => (
//                   <Option key={index} value={index}>
//                     {rider.name}
//                   </Option>
//                 ))}
//               </Select>
//               <label>Select Date:</label>
//               <Input
//                 type="date"
//                 name="date"
//                 value={delivery.date}
//                 onChange={(e) => handleDeliveryChange("date", e.target.value)}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//               />
//               <Button
//                 type="primary"
//                 onClick={viewDeliverySheet}
//                 style={{ marginBottom: "1rem" }}
//               >
//                 View Delivery Sheet
//               </Button>

//               {deliverySheetData.length > 0 ? (
//                 <div>
//                   <Table
//                     id="deliverySheet"
//                     columns={columns}
//                     dataSource={deliverySheetData}
//                     rowKey={(record, index) => index}
//                     pagination={false}
//                   />
//                   <Button
//                     className="bg-success text-light"
//                     onClick={downloadPDFSheet}
//                     style={{ marginTop: "1rem" }}
//                   >
//                     Download as PDF
//                   </Button>
//                 </div>
//               ) : (
//                 <p>No deliveries found for the selected rider and date.</p>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </main>
//   );
// };

// export default ViewSheet;

import { Card, Col, Input, Row, Select, Table, Typography, Button, message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
import { collection, getDocs, query } from "firebase/firestore";

const { Option } = Select;
const { Title } = Typography;

const ViewSheet = () => {
  const [riders, setRiders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [deliverySheetData, setDeliverySheetData] = useState([]);
  const [delivery, setDelivery] = useState({ riderId: "", date: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch riders data
        const ridersQuery = query(collection(fireStore, "riders"));
        const ridersSnapshot = await getDocs(ridersQuery);
        const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRiders(ridersList);

        // Fetch deliveries data
        const deliveriesQuery = query(collection(fireStore, "deliveries"));
        const deliveriesSnapshot = await getDocs(deliveriesQuery);
        const deliveriesList = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDeliveries(deliveriesList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        message.error("Failed to fetch data from Firestore!");
      }
    };

    fetchData();
  }, []);

  const handleDeliveryChange = (name, value) => {
    setDelivery((prev) => ({ ...prev, [name]: value }));
  };

  const viewDeliverySheet = () => {
    if (!delivery.riderId || !delivery.date) {
      message.error("Please select both rider and date!");
      return;
    }

    const selectedRider = riders.find(rider => rider.id === delivery.riderId);
    const riderName = selectedRider ? selectedRider.name : "";
    const filteredDeliveries = deliveries
      .filter((d) => d.riderName === riderName && d.date === delivery.date)
      .map((d) => ({
        ...d,
        riderName, // Adding rider name for display
      }));

    setDeliverySheetData(filteredDeliveries);
  };

  const downloadPDFSheet = () => {
    const doc = new jsPDF();
    doc.text("Delivery Sheet", 20, 20); // Add a title
    doc.autoTable({
      head: [["Rider Name", "CN Number", "Consignee Name", "Receiver Name", "Date"]],
      body: deliverySheetData.map((item) => [
        item.riderName,
        item.cnNumber,
        item.consigneeName,
        item.receiverName,
        item.date,
      ]),
      startY: 30, // Position the table below the title
    });
    doc.save("delivery_sheet.pdf");
  };

  const columns = [
    {
      title: "Rider Name",
      dataIndex: "riderName",
      key: "riderName",
    },
    {
      title: "CN Number",
      dataIndex: "cnNumber",
      key: "cnNumber",
    },
    {
      title: "Consignee Name",
      dataIndex: "consigneeName",
      key: "consigneeName",
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col span={24}>
            <Card>
              <Title level={1}>View Delivery Sheet</Title>
              <label>Select Rider:</label>
              <Select
                name="riderId"
                value={delivery.riderId}
                onChange={(value) => handleDeliveryChange("riderId", value)}
                style={{ width: "100%", marginBottom: "1rem" }}
                placeholder="Select a rider"
              >
                {riders.map((rider) => (
                  <Option key={rider.id} value={rider.id}>
                    {rider.name}
                  </Option>
                ))}
              </Select>
              <label>Select Date:</label>
              <Input
                type="date"
                name="date"
                value={delivery.date}
                onChange={(e) => handleDeliveryChange("date", e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <Button
                type="primary"
                onClick={viewDeliverySheet}
                style={{ marginBottom: "1rem" }}
              >
                View Delivery Sheet
              </Button>

              {deliverySheetData.length > 0 ? (
                <div>
                  <Table
                    id="deliverySheet"
                    columns={columns}
                    dataSource={deliverySheetData}
                    rowKey="id" // Use the unique id from the data as the rowKey
                    pagination={false}
                  />
                  <Button
                    className="bg-success text-light"
                    onClick={downloadPDFSheet}
                    style={{ marginTop: "1rem" }}
                  >
                    Download as PDF
                  </Button>
                </div>
              ) : (
                <p>No deliveries found for the selected rider and date.</p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ViewSheet;

// import { Card, Col, Input, Row, Select, Table, Typography, message } from "antd";
// import jsPDF from "jspdf";
// import React, { useState } from "react";
// import { Container } from "react-bootstrap";

// const { Option } = Select;
// const { Title } = Typography;

// const ViewSheet = () => {
//   const [riders, setRiders] = useState(JSON.parse(localStorage.getItem("riders")) || []);
//   const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem("deliveries")) || []);
//   const [deliverySheetData, setDeliverySheetData] = useState([]);
//   const [delivery, setDelivery] = useState({ riderIndex: "", date: "" });

//   const handleDeliveryChange = (name, value) => {
//     setDelivery((prev) => ({ ...prev, [name]: value }));
//   };

//   const viewDeliverySheet = () => {
//     if (!delivery.riderIndex || !delivery.date) {
//       message.error("Please select both rider and date!");
//       return;
//     }

//     const riderName = riders[delivery.riderIndex].name;
//     const filteredDeliveries = deliveries.filter(
//       (d) => d.rider === riderName && d.date === delivery.date
//     );
//     setDeliverySheetData(filteredDeliveries);
//   };

//   const downloadPDFSheet = () => {
//     const doc = new jsPDF();
//     doc.html(document.querySelector("#deliverySheet"), {
//       callback: function (doc) {
//         doc.save("delivery_sheet.pdf");
//       },
//     });
//   };

//   return (
//     <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <Container>
//         <Row className="d-flex justify-content-center align-items-center">
//           <Col>
//             <Card>
//               <Title level={1}>View Delivery Sheet</Title>
//               <label>Select Rider:</label>
//               <Select
//                 name="riderIndex"
//                 value={delivery.riderIndex}
//                 onChange={(value) => handleDeliveryChange("riderIndex", value)}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//                 placeholder="Select a rider"
//               >
//                 {riders.map((rider, index) => (
//                   <Option key={index} value={index}>
//                     {rider.name}
//                   </Option>
//                 ))}
//               </Select>
//               <label>Select Date:</label>
//               <Input
//                 type="date"
//                 name="date"
//                 value={delivery.date}
//                 onChange={(e) => handleDeliveryChange("date", e.target.value)}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//               />
//               <button onClick={viewDeliverySheet}>View Delivery Sheet</button>

//               {deliverySheetData.length > 0 && (
//                 <div>
//                   <Table id="deliverySheet">
//                     <thead>
//                       <tr>
//                         <th>CN Number</th>
//                         <th>Consignee Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {deliverySheetData.map((delivery, index) => (
//                         <tr key={index}>
//                           <td>{delivery.cnNumber}</td>
//                           <td>{delivery.consigneeName}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                   <button onClick={downloadPDFSheet}>Download as PDF</button>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </main>
//   );
// };

// export default ViewSheet;
