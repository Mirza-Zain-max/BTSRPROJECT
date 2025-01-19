// import { DeleteFilled, FileAddFilled } from "@ant-design/icons";
// import { Col, message, Modal, Row, Input, Select, DatePicker } from "antd";
// import React, { useEffect, useState } from "react";
// import { Container, Table, Button } from "react-bootstrap";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const { Option } = Select;

// const ExcelSheet = () => {
//   const [couriers, setCouriers] = useState([]);
//   const [filteredCouriers, setFilteredCouriers] = useState([]);
//   const [editForm, setEditForm] = useState({
//     consignee: "",
//     cnnumber: "",
//     rider: "",
//     reserved: "",
//   });
//   const [riders, setRiders] = useState([]);
//   const [selectedRider, setSelectedRider] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch couriers and riders from localStorage on mount
//   useEffect(() => {
//     const savedCouriers = localStorage.getItem("courierData");
//     const savedRiders = localStorage.getItem("couriers");
//     if (savedCouriers) {
//       const parsedCouriers = JSON.parse(savedCouriers);
//       setCouriers(parsedCouriers);
//       setFilteredCouriers(parsedCouriers);
//     }
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }
//   }, []);

//   // Filter couriers by rider and date
//   const filterCouriers = () => {
//     let filtered = couriers;

//     if (selectedRider) {
//       filtered = filtered.filter((courier) => courier.rider === selectedRider);
//     }

//     if (selectedDate) {
//       filtered = filtered.filter(
//         (courier) =>
//           new Date(courier.createdAt).toDateString() ===
//           selectedDate.toDateString()
//       );
//     }

//     setFilteredCouriers(filtered);
//   };

//   useEffect(() => {
//     filterCouriers();
//   }, [selectedRider, selectedDate]);

//   const handleDeleteCourier = (cnnumber) => {
//     const updatedCouriers = couriers.filter(
//       (courier) => courier.cnnumber !== cnnumber
//     );
//     setCouriers(updatedCouriers);
//     setFilteredCouriers(updatedCouriers);
//     localStorage.setItem("courierData", JSON.stringify(updatedCouriers));
//     message.success("Courier deleted successfully!");
//   };

//   const handleEditCourier = (courier) => {
//     setEditForm(courier);
//     setIsModalOpen(true);
//   };

//   const handleSaveEdit = () => {
//     const updatedCouriers = couriers.map((courier) =>
//       courier.cnnumber === editForm.cnnumber ? editForm : courier
//     );
//     setCouriers(updatedCouriers);
//     setFilteredCouriers(updatedCouriers);
//     localStorage.setItem("courierData", JSON.stringify(updatedCouriers));
//     setEditForm({ consignee: "", cnnumber: "", rider: "", reserved: "" });
//     message.success("Courier updated successfully!");
//     setIsModalOpen(false);
//   };

//   const handleReservedChange = (cnnumber, value) => {
//     const updatedCouriers = couriers.map((courier) =>
//       courier.cnnumber === cnnumber ? { ...courier, reserved: value } : courier
//     );
//     setCouriers(updatedCouriers);
//     setFilteredCouriers(updatedCouriers);
//     localStorage.setItem("courierData", JSON.stringify(updatedCouriers));
//   };

//   const saveToPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Courier List", 10, 10);

//     const headers = [
//       ["#", "Rider", "Consignee", "CN Number", "Reserved", "Timestamp"],
//     ];
//     const data = filteredCouriers.map((courier, index) => [
//       index + 1,
//       courier.rider,
//       courier.consignee,
//       courier.cnnumber,
//       courier.reserved || "",
//       courier.createdAt,
//     ]);

//     doc.autoTable({ head: headers, body: data, startY: 20 });
//     doc.save("couriers.pdf");
//     message.success("PDF downloaded successfully!");
//   };

//   return (
//     <main>
//       <Container>
//         <Row>
//           <Col span={24}>
//             <h1 className="text-center my-5">Make Delivery Sheet</h1>

//             {/* Dropdown and Date Filter */}
//             <div className="mb-3 d-flex gap-3">
//               <Select
//                 className="w-25"
//                 placeholder="Select Rider to Filter"
//                 value={selectedRider}
//                 onChange={(value) => setSelectedRider(value)}
//                 allowClear
//               >
//                 {riders.map((rider, index) => (
//                   <Option key={index} value={rider.name}>
//                     {rider.name}
//                   </Option>
//                 ))}
//               </Select>
//               <DatePicker
//                 placeholder="Select Date"
//                 onChange={(date) => setSelectedDate(date ? date.toDate() : null)}
//                 allowClear
//               />
//             </div>

//             {filteredCouriers.length > 0 ? (
//               <Table striped bordered hover>
//                 <thead className="text-center">
//                   <tr>
//                     <th>#</th>
//                     <th>Rider</th>
//                     <th>Consignee</th>
//                     <th>CN Number</th>
//                     <th>Reserved</th>
//                     <th>Timestamp</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredCouriers.map((courier, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{courier.rider}</td>
//                       <td>{courier.consignee}</td>
//                       <td>{courier.cnnumber}</td>
//                       <td>
//                         <Input
//                           value={courier.reserved || ""}
//                           onChange={(e) =>
//                             handleReservedChange(
//                               courier.cnnumber,
//                               e.target.value
//                             )
//                           }
//                           placeholder="Enter reserved info"
//                         />
//                       </td>
//                       <td>{new Date(courier.createdAt).toLocaleString()}</td>
//                       <td>
//                         <Button
//                           className="btn btn-danger mx-1"
//                           onClick={() =>
//                             handleDeleteCourier(courier.cnnumber)
//                           }
//                         >
//                           <DeleteFilled />
//                         </Button>
//                         <Button
//                           className="btn btn-success"
//                           onClick={() => handleEditCourier(courier)}
//                         >
//                           <FileAddFilled />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             ) : (
//               <p>No couriers match the selected filters.</p>
//             )}
//           </Col>
//         </Row>

//         {/* Modal for editing a courier */}
//         <Modal
//           open={isModalOpen}
//           onOk={handleSaveEdit}
//           onCancel={() => setIsModalOpen(false)}
//           okText="Save"
//           cancelText="Cancel"
//         >
//           <h3>Edit Courier</h3>
//           <Input
//             className="my-2"
//             type="text"
//             name="rider"
//             placeholder="Rider Name"
//             value={editForm.rider}
//             onChange={(e) =>
//               setEditForm({ ...editForm, rider: e.target.value })
//             }
//           />
//           <Input
//             className="my-2"
//             type="text"
//             name="consignee"
//             placeholder="Consignee"
//             value={editForm.consignee}
//             onChange={(e) =>
//               setEditForm({ ...editForm, consignee: e.target.value })
//             }
//           />
//           <Input
//             className="my-2"
//             type="text"
//             name="cnnumber"
//             placeholder="CN Number"
//             value={editForm.cnnumber}
//             disabled
//           />
//           <Input
//             className="my-2"
//             type="text"
//             name="reserved"
//             placeholder="Reserved Info"
//             value={editForm.reserved}
//             onChange={(e) =>
//               setEditForm({ ...editForm, reserved: e.target.value })
//             }
//           />
//         </Modal>
//       </Container>
//     </main>
//   );
// };

// export default ExcelSheet;


// import { Card, Form, Input, Select, DatePicker, message, Table, Col, Row } from "antd";
// import moment from "moment";
// import React, { useEffect, useState, useRef } from "react";
// import { Button } from "react-bootstrap";

// const { Option } = Select;

// const RiderList = () => {
//   const [form, setForm] = useState({
//     consignee: "",
//     cnnumber: "",
//     rider: "",
//     date: null,
//   });
//   const [riders, setRiders] = useState([]);
//   const [couriers, setCouriers] = useState([]);
//   const cnNumberInput = useRef(null); // Reference to CN Number input

//   // Fetch riders and couriers from localStorage on component mount
//   useEffect(() => {
//     const savedRiders = localStorage.getItem("couriers");
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }

//     const savedCouriers = localStorage.getItem("courierData");
//     if (savedCouriers) {
//       setCouriers(JSON.parse(savedCouriers));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleRiderChange = (value) => {
//     setForm({ ...form, rider: value });
//   };

//   const handleDateChange = (date, dateString) => {
//     setForm({ ...form, date: dateString });
//   };

//   const handleAddCourier = () => {
//     const { consignee, cnnumber, rider, date } = form;
//     if (consignee && cnnumber && rider && date) {
//       const newCourier = { consignee, cnnumber, rider, date };

//       const updatedCouriers = [...couriers, newCourier];
//       setCouriers(updatedCouriers);
//       localStorage.setItem("courierData", JSON.stringify(updatedCouriers));

//       // Reset consignee and CN number fields
//       setForm({ ...form, consignee: "", cnnumber: "" });

//       message.success("Courier added successfully!");

//       // Focus on CN number field after submission
//       cnNumberInput.current.focus();
//     } else {
//       message.error("Please fill all fields!");
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent form submission
//       handleAddCourier(); // Submit form on Enter press
//     }
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Rider",
//       dataIndex: "rider",
//       key: "rider",
//     },
//     {
//       title: "Consignee",
//       dataIndex: "consignee",
//       key: "consignee",
//     },
//     {
//       title: "CN Number",
//       dataIndex: "cnnumber",
//       key: "cnnumber",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//   ];

//   return (
//     <main style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center">
//       <div className="Rider">
//         <h1 className="display-5">Make Delivery Sheet</h1>
//         <Row className="d-flex justify-content-center align-items-center">
//           <Col>
//             <Form>
//               <Card className="border-2 border-bottom border-black">
//                 <Row>
//                   <Col span={12}>
//                     <label>
//                       <span className="fw-bolder fs-6">Date</span>
//                     </label><br />
//                     <DatePicker
//                       className="w-75"
//                       onChange={handleDateChange}
//                       value={form.date ? moment(form.date) : null}
//                     />
//                   </Col>
//                   <Col span={12}>
//                     <label>
//                       <span className="fw-bolder fs-6">Select Rider</span><br />
//                     </label>
//                     <Select
//                       className="w-75"
//                       placeholder="Select a rider"
//                       value={form.rider}
//                       onChange={handleRiderChange}
//                     >
//                       {riders.map((rider, index) => (
//                         <Option key={index} value={rider.name}>
//                           {rider.name}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Col>
//                 </Row>
//                 <label>
//                   <span className="fw-bolder fs-6">CN Number</span>
//                 </label>
//                 <Input
//                   className="my-2 border-2 rounded-2"
//                   type="text"
//                   name="cnnumber"
//                   placeholder="CN Number"
//                   value={form.cnnumber}
//                   onKeyDown={(e) => handleKeyPress(e, "consignee")}
//                   onChange={handleChange}
//                   ref={cnNumberInput} // Use ref here
//                 />
//                 <label>
//                   <span className="fw-bolder fs-6">Consignee</span>
//                 </label>
//                 <Input
//                   className="my-2 border-2 rounded-2"
//                   type="text"
//                   name="consignee"
//                   placeholder="Consignee"
//                   value={form.consignee}
//                   onKeyDown={handleKeyPress}
//                   onChange={handleChange}
//                 />

//                 <div className="d-flex justify-content-center align-items-center">
//                   <Button className="btn btn-success justify-content-center w-50 align-items-center d-flex" onKeyUp={(e) => handleKeyPress(e, "cnnumber")} onClick={handleAddCourier}>
//                     Add Courier
//                   </Button>
//                 </div>
//               </Card>
//             </Form>
//           </Col>
//         </Row>
//       </div>

//       {/* Excel-like table view */}
//       {/* <div className="mt-5 w-75">
//         <h2 className="text-center">Courier List</h2>
//         <Table
//           dataSource={couriers}
//           columns={columns}
//           rowKey="cnnumber"
//           pagination={{ pageSize: 5 }}
//         />
//       </div> */}
//     </main>
//   );
// };

// export default RiderList;


// import { Card, Form, Input, Select, DatePicker, message, Col, Row } from "antd";
// import moment from "moment";
// import React, { useEffect, useState, useRef } from "react";
// import { Button } from "react-bootstrap";

// const { Option } = Select;

// const ExcelSheet = () => {
//   const [form, setForm] = useState({
//     consignee: "",
//     cnnumber: "",
//     rider: "",
//     date: null,
//   });
//   const [riders, setRiders] = useState([]);
//   const [couriers, setCouriers] = useState([]);
//   const cnNumberInput = useRef(null); // Reference to CN Number input

//   // Fetch riders and couriers from localStorage on component mount
//   useEffect(() => {
//     const savedRiders = localStorage.getItem("couriers");
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }

//     const savedCouriers = localStorage.getItem("courierData");
//     if (savedCouriers) {
//       setCouriers(JSON.parse(savedCouriers));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleRiderChange = (value) => {
//     setForm({ ...form, rider: value });
//   };

//   const handleDateChange = (date, dateString) => {
//     setForm({ ...form, date: dateString });
//   };

//   const handleAddCourier = () => {
//     const { consignee, cnnumber, rider, date } = form;
//     if (consignee && cnnumber && rider && date) {
//       const newCourier = { consignee, cnnumber, rider, date };

//       const updatedCouriers = [...couriers, newCourier];
//       setCouriers(updatedCouriers);
//       localStorage.setItem("courierData", JSON.stringify(updatedCouriers));

//       // Reset consignee and CN number fields
//       setForm({ consignee: "", cnnumber: "", rider: form.rider, date: form.date });

//       message.success("Courier added successfully!");

//       // Focus on CN number field after submission
//       cnNumberInput.current.focus();
//     } else {
//       message.error("Please fill all fields!");
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent form submission on Enter key press
//       if (form.cnnumber && form.consignee) {
//         handleAddCourier(); // Submit form on Enter press
//       }
//     }
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Rider",
//       dataIndex: "rider",
//       key: "rider",
//     },
//     {
//       title: "Consignee",
//       dataIndex: "consignee",
//       key: "consignee",
//     },
//     {
//       title: "CN Number",
//       dataIndex: "cnnumber",
//       key: "cnnumber",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//   ];

//   return (
//     <main style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center">
//       <div className="Rider">
//         <h1 className="display-5">Make Delivery Sheet</h1>
//         <Row className="d-flex justify-content-center align-items-center">
//           <Col>
//             <Form>
//               <Card className="border-2 border-bottom border-black">
//                 <Row>
//                   <Col span={12}>
//                     <label>
//                       <span className="fw-bolder fs-6">Date</span>
//                     </label><br />
//                     <DatePicker
//                       className="w-75"
//                       onChange={handleDateChange}
//                       value={form.date ? moment(form.date) : null}
//                     />
//                   </Col>
//                   <Col span={12}>
//                     <label>
//                       <span className="fw-bolder fs-6">Select Rider</span><br />
//                     </label>
//                     <Select
//                       className="w-75"
//                       placeholder="Select a rider"
//                       value={form.rider}
//                       onChange={handleRiderChange}
//                     >
//                       {riders.map((rider, index) => (
//                         <Option key={index} value={rider.name}>
//                           {rider.name}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Col>
//                 </Row>
//                 <label>
//                   <span className="fw-bolder fs-6">CN Number</span>
//                 </label>
//                 <Input
//                   className="my-2 border-2 rounded-2"
//                   type="text"
//                   name="cnnumber"
//                   placeholder="CN Number"
//                   value={form.cnnumber}
//                   onKeyDown={handleKeyPress}
//                   onChange={handleChange}
//                   ref={cnNumberInput} // Use ref here for CN number
//                 />
//                 <label>
//                   <span className="fw-bolder fs-6">Consignee</span>
//                 </label>
//                 <Input
//                   className="my-2 border-2 rounded-2"
//                   type="text"
//                   name="consignee"
//                   placeholder="Consignee"
//                   value={form.consignee}
//                   onKeyDown={handleKeyPress}
//                   onChange={handleChange}
//                 />

//                 <div className="d-flex justify-content-center align-items-center">
//                   <Button className="btn btn-success justify-content-center w-50 align-items-center d-flex" onClick={handleAddCourier}>
//                     Add Rider
//                   </Button>
//                 </div>
//               </Card>
//             </Form>
//           </Col>
//         </Row>
//       </div>

//       {/* Excel-like table view */}
//       {/* <div className="mt-5 w-75">
//         <h2 className="text-center">Courier List</h2>
//         <Table
//           dataSource={couriers}
//           columns={columns}
//           rowKey="cnnumber"
//           pagination={{ pageSize: 5 }}
//         />
//       </div> */}
//     </main>
//   );
// };

// export default ExcelSheet;


// import { Card, Form, Input, Select, DatePicker, message } from "antd";
// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import moment from "moment";

// const { Option } = Select;

// const ExcelSheet = () => {
//   const [form, setForm] = useState({
//     cnNumber: "",
//     consigneeNumber: "",
//     riderName: "",
//     date: null,
//   });
//   const [riders, setRiders] = useState([]);

//   useEffect(() => {
//     const savedRiders = localStorage.getItem("riderData");
//     if (savedRiders) {
//       setRiders(JSON.parse(savedRiders));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleRiderChange = (value) => {
//     setForm({ ...form, riderName: value });
//   };

//   const handleDateChange = (date, dateString) => {
//     setForm({ ...form, date: dateString });
//   };

//   const handleAddCourier = () => {
//     const { cnNumber, consigneeNumber, riderName, date } = form;

//     if (cnNumber && consigneeNumber && riderName && date) {
//       const savedCouriers = localStorage.getItem("courierData");
//       const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];

//       couriers.push({ cnNumber, consigneeNumber, riderName, date });
//       localStorage.setItem("courierData", JSON.stringify(couriers));
//       setForm({ cnNumber: "", consigneeNumber: "", riderName: "", date: null });
//       message.success("Courier added successfully!");
//     } else {
//       message.error("Please fill all fields!");
//     }
//   };

//   return (
//     <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <div>
//         <h1>Add Courier</h1>
//         <Form>
//           <Card>
//             <label>Date</label>
//             <DatePicker
//               className="my-2 w-100"
//               onChange={handleDateChange}
//               value={form.date ? moment(form.date) : null}
//             />

//             <label>Select Rider</label>
//             <Select
//               className="my-2 w-100"
//               placeholder="Select a rider"
//               value={form.riderName}
//               onChange={handleRiderChange}
//             >
//               {riders.map((rider, index) => (
//                 <Option key={index} value={rider.riderName}>
//                   {rider.riderName}
//                 </Option>
//               ))}
//             </Select>

//             <label>CN Number</label>
//             <Input
//               className="my-2"
//               type="text"
//               name="cnNumber"
//               placeholder="CN Number"
//               value={form.cnNumber}
//               onChange={handleChange}
//             />

//             <label>Consignee Name
//             </label>
//             <Input
//               className="my-2"
//               type="text"
//               name="consigneeNumber"
//               placeholder="Consignee Name"
//               value={form.consigneeNumber}
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

// export default ExcelSheet;


import { Card, Form, Input, Select, DatePicker, message } from "antd";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

const { Option } = Select;

const ExcelSheet = () => {
  const [form, setForm] = useState({
    cnNumber: "",
    consigneeNumber: "",
    selectedRider: "" ,
    riderName: "",
    date: null,
  });
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const savedRiders = localStorage.getItem("riderData");
    if (savedRiders) {
      setRiders(JSON.parse(savedRiders));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRiderChange = (value) => {
    setForm({ ...form, riderName: value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date: date ? moment(date).format("YYYY-MM-DD") : null });
  };

  const handleAddCourier = () => {
    const { cnNumber, consigneeNumber, riderName, date } = form;

    if (cnNumber && consigneeNumber && riderName && date) {
      const savedCouriers = localStorage.getItem("courierData");
      const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];

      couriers.push({ cnNumber, consigneeNumber, riderName, date });
      localStorage.setItem("courierData", JSON.stringify(couriers));
      setForm({ cnNumber: "", consigneeNumber: "", riderName: "", date: null });
      message.success("Courier added successfully!");
    } else {
      message.error("Please fill all fields!");
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div>
        <h1>Add Courier</h1>
        <Form>
          <Card>
            <label>Date</label>
            <DatePicker
              className="my-2 w-100"
              onChange={handleDateChange}
              value={form.date ? moment(form.date, "YYYY-MM-DD") : null}
            />

            <label>Select Rider</label>
            <Select
              className="my-2 w-100"
              placeholder="Select a rider"
              value={form.riderName}
              onChange={handleRiderChange}
            >
              {riders.map((rider, index) => (
                <Option key={index} value={rider.riderName}>
                  {rider.riderName}
                </Option>
              ))}
            </Select>

            <label>CN Number</label>
            <Input
              className="my-2"
              type="text"
              name="cnNumber"
              placeholder="CN Number"
              value={form.cnNumber}
              onChange={handleChange}
            />

            <label>Consignee Name</label>
            <Input
              className="my-2"
              type="text"
              name="consigneeNumber"
              placeholder="Consignee Name"
              value={form.consigneeNumber}
              onChange={handleChange}
            />

            <Button className="mt-3 w-100" onClick={handleAddCourier}>
              Add Courier
            </Button>
          </Card>
        </Form>
      </div>
    </main>
  );
};

export default ExcelSheet;
