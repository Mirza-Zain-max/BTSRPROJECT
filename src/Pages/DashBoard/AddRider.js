// import { Card, Form, Input, message } from "antd";
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";

// const AddRider = () => {
//     const [form, setForm] = useState({ name: "", contact: "", address: "" });
//     const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };
//     const handleAddCourier = () => {
//         const { name, contact, address } = form;
//         if (name && contact && address) {
//             const timestamp = new Date().toISOString(); // Current date and time
//             const savedCouriers = localStorage.getItem("couriers");
//             const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];
//             const updatedCouriers = [
//                 ...couriers,
//                 { ...form, createdAt: timestamp },
//             ];
//             localStorage.setItem("couriers", JSON.stringify(updatedCouriers));
//             setForm({ name: "", contact: "", address: "" });
//             message.success("Rider created successfully!");
//         } else {
//             message.error("Please fill all fields!");
//         }
//     };
//     const handleKeyPress = (event, nextField) => {
//         if (event.key === "Enter") {
//           event.preventDefault(); // Prevent form submission
//           const nextInput = document.querySelector(`[name="${nextField}"]`);
//           if (nextInput) {
//             nextInput.focus(); // Move focus to the next input field
//           } else if (nextField === "submit") {
//             handleAddCourier(); // Submit form if last input
//           }
//         }
//       };

//     return (
//         <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
//             <div className="Rider">
//                 <h1 className="display-5 ">Add Rider</h1>
//                 <Form>
//                     <Card className="border-2 border-bottom border-black">
//                         <label>
//                             <span className="fw-bolder fs-6"> Rider Name</span>
//                         </label>
//                         <Input className="my-2 border-2 rounded-2" type="text" name="name" placeholder="Rider Name" value={form.name} onKeyDown={(e)=>handleKeyPress(e,'contact')} onChange={handleChange} />
//                         <label>
//                             <span className="fw-bolder fs-6"> Rider Contact</span>
//                         </label>
//                         <Input className="my-2 border-2 rounded-2" type="number" name="contact" placeholder="Rider Contact" value={form.contact} onKeyDown={(e)=>handleKeyPress(e,'address')} onChange={handleChange} />
//                         <label>
//                             <span className="fw-bolder fs-6"> Address</span>
//                         </label>
//                         <Input className="my-2 border-2 rounded-2" type="text" name="address" placeholder="Address" value={form.address} onKeyDown={(e)=>handleKeyPress(e,'submit')} onChange={handleChange} />
//                         {/* <label>
//                             <span className="fw-bolder fs-6"> Consignee Number</span>
//                         </label>
//                         <Input className="my-2 border-2 rounded-2" type="text" name="consigneeNumber" placeholder="Consignee Number" value={form.consigneeNumber} onKeyDown={(e)=>handleKeyPress(e,'reciverName')} onChange={handleChange} />
//                         <label>
//                             <span className="fw-bolder fs-6">Reciver Name</span>
//                         </label>
//                         <Input className="my-2 border-2 rounded-2" type="text" name="reciverName" placeholder="Reciver Name" value={form.reciverName} onKeyDown={(e)=>handleKeyPress(e,'submit')} onChange={handleChange} /> */}
//                         <div className="d-flex justify-content-center align-items-center">
//                             <Button className="btn btn-success justify-content-center w-50 align-items-center d-flex" onClick={handleAddCourier}>Add Rider</Button>
//                         </div>
//                     </Card>
//                 </Form>
//             </div>
//         </main>
//     );
// };
// export default AddRider;


// import React, { useEffect, useState } from "react";

// const AddRider = () => {
// const [form, setForm] = useState({ name: "", contact: "", address: "" });

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
// };

// const handleAddCourier = () => {
//     const { name, contact, address } = form;
//     if (name && contact && address) {
//         const savedCouriers = localStorage.getItem("couriers");
//         const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];

//         if (couriers.some((rider) => rider.name.toLowerCase() === name.toLowerCase())) {
//             message.error("Rider already exists!");
//             return;
//         }

//         const newRider = {
//             id: Date.now(), // Unique ID for the rider
//             name,
//             contact,
//             address,
//             createdAt: new Date().toISOString(),
//         };

//         couriers.push(newRider);
//         localStorage.setItem("couriers", JSON.stringify(couriers));
//         setForm({ name: "", contact: "", address: "" });
//         message.success("Rider created successfully!");
//     } else {
//         message.error("Please fill all fields!");
//     }
// };

// return (
//     <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
//         <div>
//             <h1 className="display-5">Add Rider</h1>
//             <Form>
//                 <Card className="border-2 border-bottom border-black">
//                     <label>
//                         <span className="fw-bolder fs-6">Rider Name</span>
//                     </label>
//                     <Input
//                         className="my-2 border-2 rounded-2"
//                         type="text"
//                         name="name"
//                         placeholder="Rider Name"
//                         value={form.name}
//                         onChange={handleChange}
//                     />
//                     <label>
//                         <span className="fw-bolder fs-6">Rider Contact</span>
//                     </label>
//                     <Input
//                         className="my-2 border-2 rounded-2"
//                         type="text"
//                         name="contact"
//                         placeholder="Rider Contact"
//                         value={form.contact}
//                         onChange={handleChange}
//                     />
//                     <label>
//                         <span className="fw-bolder fs-6">Address</span>
//                     </label>
//                     <Input
//                         className="my-2 border-2 rounded-2"
//                         type="text"
//                         name="address"
//                         placeholder="Address"
//                         value={form.address}
//                         onChange={handleChange}
//                     />
//                     <div className="d-flex justify-content-center align-items-center">
//                         <Button
//                             className="btn btn-success w-50"
//                             onClick={handleAddCourier}
//                         >
//                             Add Rider
//                         </Button>
//                     </div>
//                 </Card>
//             </Form>
//         </div>
//     </main>

import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const AddRider = () => {
    const { Title, Paragraph } = Typography;
    const [newRider, setNewRider] = useState({ name: '', contact: '', address: '' });
    const [riders, setRiders] = useState(JSON.parse(localStorage.getItem('riders')) || []);

    useEffect(() => {
        localStorage.setItem('riders', JSON.stringify(riders));
    }, [riders]);

    const handleRiderChange = (e) => {
        const { name, value } = e.target;
        setNewRider(prev => ({ ...prev, [name]: value }));
    };

    const saveRider = () => {
        if (!newRider.name || !newRider.contact || !newRider.address) {
            message.error('Please fill all fields!');
            return;
        }
        setRiders([...riders, newRider]);
        setNewRider({ name: '', contact: '', address: '' });
        message.success('Rider added successfully!');
    };

    const deleteRider = () => {
        if (!newRider.name) {
            message.error('Please enter rider name to delete.');
            return;
        }
        const riderIndex = riders.findIndex(rider => rider.name === newRider.name);
        if (riderIndex === -1) {
            message.success('Rider not found!');
            return;
        }
        const updatedRiders = [...riders];
        updatedRiders.splice(riderIndex, 1);
        setRiders(updatedRiders);
        message.success('Rider deleted successfully!');
    };

    return (
        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Title level={1}>Add Rider</Title>
                        <Card className="p-4 my-4 border-black">
                            <label>Rider Name:</label>
                            <Input type="text" className="my-2"  name="name" value={newRider.name} onChange={handleRiderChange} placeholder="Enter rider name" />
                            <label>Contact Number:</label>
                            <Input type="text" className="my-2" name="contact" value={newRider.contact} onChange={handleRiderChange} placeholder="Enter contact number" />
                            <label>Address:</label>
                            <Input type="text" className="my-2" name="address" value={newRider.address} onChange={handleRiderChange} placeholder="Enter address" />
                            <Button  className="me-2 mt-2" style={{backgroundColor: "Green" , color: " #fff"}} onClick={saveRider}>Save Rider</Button>
                            <Button className="me-2 mt-2 bg-danger"  style={{ color: " #fff"}} onClick={deleteRider}>Delete Rider</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};


export default AddRider;
