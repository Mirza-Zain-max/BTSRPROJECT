// import { Card, Form, Input, Select, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";

// const { Option } = Select;

// const RiderList = () => {
//   const [form, setForm] = useState({ receiver: "", rider: "" });
//   const [riders, setRiders] = useState([]);

//   // Fetch riders from localStorage on component mount
//   useEffect(() => {
//     const savedRiders = localStorage.getItem("couriers");
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleRiderChange = (value) => {
//     setForm({ ...form, rider: value });
//   };

//   const handleAddCourier = () => {
//     const { receiver, rider } = form;

//     if (receiver && rider) {
//       const savedCouriers = localStorage.getItem("courierData");
//       const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];

//       // Add new courier
//       const updatedCouriers = [
//         ...couriers,
//         { receiver, rider, date: new Date().toISOString() },
//       ];

//       localStorage.setItem("courierData", JSON.stringify(updatedCouriers));
//       setForm({ receiver: "", rider: "" });
//       message.success("Courier added successfully!");
//     } else {
//       message.error("Please fill all fields!");
//     }
//   };

//   return (
//     <main
//       className="d-flex justify-content-center align-items-center"
//       style={{ height: "100vh" }}
//     >
//       <div>
//         <h1>Add Courier</h1>
//         <Form>
//           <Card>
//             <label>Select Rider</label>
//             <Select
//               className="my-2 w-100"
//               placeholder="Select a rider"
//               value={form.rider}
//               onChange={handleRiderChange}
//             >
//               {riders.map((rider, index) => (
//                 <Option key={index} value={rider.name}>
//                   {rider.name}
//                 </Option>
//               ))}
//             </Select>

//             <label>Receiver Name</label>
//             <Input
//               className="my-2"
//               type="text"
//               name="receiver"
//               placeholder="Receiver Name"
//               value={form.receiver}
//               onChange={handleChange}
//             />

//             <Button className="mt-3 w-100" onClick={handleAddCourier}>
//               Add Courier
//             </Button>
//           </Card>
//         </Form>
//       </div>
//     </main>
//   );
// };

// export default RiderList;


// import { Card, Form, Input, Select, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";

// const { Option } = Select;

// const RiderList = () => {
//   const [form, setForm] = useState({ receiverName: "", riderName: "" });
//   const [riders, setRiders] = useState([]);

//   // Fetch riders from localStorage on mount
//   useEffect(() => {
//     const savedRiders = localStorage.getItem("couriers");
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleAddRider = () => {
//     const { receiverName, riderName } = form;

//     if (receiverName && riderName) {
//       const savedData = localStorage.getItem("riderData");
//       const riders = savedData ? JSON.parse(savedData) : [];

//       // Add new data to riderData
//       riders.push({ receiverName, riderName, date: new Date().toISOString() });
//       localStorage.setItem("riderData", JSON.stringify(riders));
//       setForm({ receiverName: "", riderName: "" });
//       message.success("Receiver and Rider added successfully!");
//     } else {
//       message.error("Please fill all fields!");
//     }
//   };

//   return (
//     <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <div>
//         <h1>Add Rider</h1>
//         <Form>
//           <Card>
//             <label>Receiver Name</label>
//             <Input
//               className="my-2"
//               type="text"
//               name="receiverName"
//               placeholder="Receiver Name"
//               value={form.receiverName}
//               onChange={handleChange}
//             />

//             <label>Rider Name</label>
//             <Input
//               className="my-2"
//               type="text"
//               name="riderName"
//               placeholder="Rider Name"
//               value={form.riderName}
//               onChange={handleChange}
//             />

//             <Button className="mt-3 w-100" onClick={handleAddRider}>
//               Add Rider
//             </Button>
//           </Card>
//         </Form>
//       </div>
//     </main>
//   );
// };

// export default RiderList;



// import { Card, Col, Form, Input, Row, Select, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { Button, Container } from "react-bootstrap";

// const { Option } = Select;

// const ViewSheet = () => {
//   const [form, setForm] = useState({ receiverName: "", selectedRider: "" });
//   const [riders, setRiders] = useState([]);

//   // Fetch riders from localStorage on mount
//   useEffect(() => { const savedRiders = localStorage.getItem("couriers"); if (savedRiders) { setRiders(JSON.parse(savedRiders)); } }, []);
//   const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };
//   const handleRiderSelect = (value) => { setForm({ ...form, selectedRider: value }); };
//   const handleAddRider = () => {
//     const { receiverName, selectedRider } = form;
//     if (receiverName && selectedRider) {
//       const savedData = localStorage.getItem("riderData");
//       const riders = savedData ? JSON.parse(savedData) : [];
//       // Add new data to riderData
//       riders.push({ receiverName, riderName: selectedRider, date: new Date().toISOString(), });
//       localStorage.setItem("riderData", JSON.stringify(riders));
//       setForm({ receiverName: "", selectedRider: "" });
//       message.success("Receiver and Rider added successfully!");
//     } else { message.error("Please fill all fields!") }
//   };

//   return (
//     <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <Container>
//         <Row className="d-flex justify-content-center align-items-center" >
//           <Col>
//             <h1>View Sheet</h1>
//             <Form>
//               <Card>
//                 <strong>Select Rider:</strong>
//                 <Select className="my-2 w-100" placeholder="Select a rider" value={form.selectedRider} onChange={handleRiderSelect}>
//                   {riders.map((rider, index) => (<Option key={index} value={rider.name}> {rider.name} </Option>))}
//                 </Select>
//                 <strong>Receiver Name:</strong>
//                 <Input className="my-2" type="text" name="receiverName" placeholder="Receiver Name" value={form.receiverName} onChange={handleChange} />
//                 <Button className="mt-3 w-100" onClick={handleAddRider}>
//                   Add Reciver
//                 </Button>
//               </Card>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </main>
//   );
// };

// export default ViewSheet;


// import { Card, Col, Row, Table } from "antd";
// import jsPDF from "jspdf";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";

// const ViewSheet = () => {
//   const [riderData, setRiderData] = useState([]);

//   useEffect(() => {
//     const savedData = localStorage.getItem("riderData");
//     if (savedData) {
//       setRiderData(JSON.parse(savedData));
//     }
//   }, []);

//   return (
//     <main className="d-flex justify-content-center align-items-center">
//       <Container>
//         <Row>
//           <Col>
//             <h1>View Sheet</h1>
//             <Card>
//               <Table
//                 dataSource={riderData}
//                 rowKey="cnNumber"
//                 columns={[
//                   {
//                     title: "Rider Name",
//                     dataIndex: "riderName",
//                     key: "riderName",
//                   },
//                   {
//                     title: "CN Number",
//                     dataIndex: "cnNumber",
//                     key: "cnNumber",
//                   },
//                   {
//                     title: "Receiver Name",
//                     dataIndex: "receiverName",
//                     key: "receiverName",
//                   },
//                   {
//                     title: "Rider Name",
//                     dataIndex: "riderName",
//                     key: "riderName",
//                   },
//                   {
//                     title: "Date",
//                     dataIndex: "date",
//                     key: "date",
//                   },
//                 ]}
//                 pagination={false}
//               />
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </main>
//   );
// };

// import { Card, Col, Row, Select, Table , Typography, message} from "antd";
// import jsPDF from "jspdf";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// const ViewSheet = () => {
//   const {Select}
//   const {Title} = Typography;
//   const [riders, setRiders] = useState(JSON.parse(localStorage.getItem('riders')) || []);
//   const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//   const [deliverySheetData, setDeliverySheetData] = useState([]);
//   const [delivery, setDelivery] = useState({ riderIndex: '', date: '' });

//   const handleDeliveryChange = (e) => {
//     const { name, value } = e.target;
//     // setDelivery(prev => ({ ...prev, [name]: value }));
// console.log(name, value )
//   };

//   const viewDeliverySheet = () => {
//     if (!delivery.riderIndex || !delivery.date) {
//       message.error('Please select both rider and date!');
//       return;
//     }
//     const riderName = riders[delivery.riderIndex].name;
//     const filteredDeliveries = deliveries.filter(delivery => delivery.rider === riderName && delivery.date === delivery.date);
//     setDeliverySheetData(filteredDeliveries);
//   };

//   const downloadPDFSheet = () => {
//     const doc = new jsPDF();
//     doc.html(document.querySelector('#deliverySheet'), {
//       callback: function (doc) {
//         doc.save('delivery_sheet.pdf');
//       }
//     });
//   };

//   return (
//     <main>
//       <Container>
//         <Row>
//           <Col>
//             <Card>
//               <Title level={1} >View Delivery Sheet</Title>
//               <label>Select Rider:</label>
//               <Select name="riderIndex" value={delivery.riderIndex} onChange={handleDeliveryChange}>
//                 <Option value="" disabled>Select a rider</Option>
//                 {riders.map((rider, index) => (
//                   <option key={index} value={index}>{rider.name}</option>
//                 ))}
//               </Select>
//               <label>Select Date:</label>
//               <input type="date" name="date" value={delivery.date} onChange={handleDeliveryChange} />
//               <button onClick={viewDeliverySheet}>View Delivery Sheet</button>

//               {deliverySheetData.length > 0 && (
//                 <div>
//                   <table id="deliverySheet">
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
//                   </table>
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

import { Card, Col, Input, Row, Select, Table, Typography, Button, message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const { Option } = Select;
const { Title } = Typography;

const ViewSheet = () => {
  const [riders, setRiders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [deliverySheetData, setDeliverySheetData] = useState([]);
  const [delivery, setDelivery] = useState({ riderIndex: "", date: "" });

  useEffect(() => {
    // Parse data or fallback to empty arrays
    setRiders(JSON.parse(localStorage.getItem("riders")) || []);
    setDeliveries(JSON.parse(localStorage.getItem("deliveries")) || []);
  }, []);

  const handleDeliveryChange = (name, value) => {
    setDelivery((prev) => ({ ...prev, [name]: value }));
  };

  const viewDeliverySheet = () => {
    if (!delivery.riderIndex || !delivery.date) {
      message.error("Please select both rider and date!");
      return;
    }

    const riderName = riders[delivery.riderIndex]?.name || "";
    const filteredDeliveries = deliveries
      .filter((d) => d.rider === riderName && d.date === delivery.date)
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
      head: [["Rider Name", "CN Number", "Consignee Name" , "Receiver Name", "Date"]],
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
                name="riderIndex"
                value={delivery.riderIndex}
                onChange={(value) => handleDeliveryChange("riderIndex", value)}
                style={{ width: "100%", marginBottom: "1rem" }}
                placeholder="Select a rider"
              >
                {riders.map((rider, index) => (
                  <Option key={index} value={index}>
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
                    rowKey={(record, index) => index}
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
