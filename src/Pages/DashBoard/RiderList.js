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



import { Card, Col, Form, Input, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const { Option } = Select;

const RiderList = () => {
  const [form, setForm] = useState({ receiverName: "", selectedRider: "" });
  const [riders, setRiders] = useState([]);

  // Fetch riders from localStorage on mount
  useEffect(() => { const savedRiders = localStorage.getItem("couriers"); if (savedRiders) { setRiders(JSON.parse(savedRiders)); } }, []);
  const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };
  const handleRiderSelect = (value) => { setForm({ ...form, selectedRider: value }); };
  const handleAddRider = () => {
    const { receiverName, selectedRider } = form;
    if (receiverName && selectedRider) {
      const savedData = localStorage.getItem("riderData");
      const riders = savedData ? JSON.parse(savedData) : [];
      // Add new data to riderData
      riders.push({ receiverName, riderName: selectedRider, date: new Date().toISOString(), });
      localStorage.setItem("riderData", JSON.stringify(riders));
      setForm({ receiverName: "", selectedRider: "" });
      message.success("Receiver and Rider added successfully!");
    } else { message.error("Please fill all fields!") }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Container>
        <Row className="d-flex justify-content-center align-items-center" >
          <Col>
            <h1>Add Rider</h1>
            <Form>
              <Card>
                <strong>Select Rider:</strong>
                <Select className="my-2 w-100" placeholder="Select a rider" value={form.selectedRider} onChange={handleRiderSelect}>
                  {riders.map((rider, index) => (<Option key={index} value={rider.name}> {rider.name} </Option>))}
                </Select>
                <strong>Receiver Name:</strong>
                <Input className="my-2" type="text" name="receiverName" placeholder="Receiver Name" value={form.receiverName} onChange={handleChange} />
                <Button className="mt-3 w-100" onClick={handleAddRider}>
                  Add Rider
                </Button>
              </Card>
            </Form>

          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RiderList;
