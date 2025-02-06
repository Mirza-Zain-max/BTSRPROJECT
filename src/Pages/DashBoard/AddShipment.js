import { Card, Col, Input, message, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
// import RiderList from "./RiderList";

const AddShipment = () => {
  const [courirs, setCourirs] = useState(() => {
    const savedCouriers = localStorage.getItem("courirs");
    return savedCouriers ? JSON.parse(savedCouriers) : [];
  });
  const [form, setForm] = useState({ name: "", trackingId: "", status: "", amount: "" });

  useEffect(() => {
    const savedCouriers = localStorage.getItem('courirs');
    if (savedCouriers) {
      setCourirs(JSON.parse(savedCouriers));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddCourier = () => {
    if (form.name && form.trackingId && form.status && form.amount) {
      const timestamp = new Date().toISOString(); // Current date and time
      const updatedCouriers = [...courirs, { ...form, createdAt: timestamp }];
      setCourirs(updatedCouriers);
      localStorage.setItem("courirs", JSON.stringify(updatedCouriers));
      setForm({ name: "", trackingId: "", status: "", amount: "" });
      message.success("Courier added successfully!");
    } else {
      message.error("Please fill all fields!");
    }
  };

  const handleKeyPress = (event, nextField) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const nextInput = document.querySelector(`[name="${nextField}"]`);
      if (nextInput) {
        nextInput.focus(); // Move focus to the next input field
      } else if (nextField === "submit") {
        handleAddCourier(); // Submit form if last input
      }
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center" >
      <Container>
        <Row className="">
          <Col span={12}>
            <Card className="border-1 border-black rounded-5">
              <Row>
                <Col span={12} className="px-2 py-1">
                  <label className="fw-bolder mb-1">Date:</label>
                  <Input type="date" className="mb-1" name="date" />
                </Col>
                <Col span={12} className="px-2 py-1">
                  <label className="mb-1 fw-bolder">CN Number:</label>
                  <Input type="number" className="mb-1" name="cnNumber" />
                </Col>
              </Row>
              <Col span={24} className="px-2 py-1">
                <label className="mb-1 fw-bolder">Shipper:</label>
                <Input className="border-2 rounded-2" type="text" name="name" placeholder="Add Shipment Name" value={form.name} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "trackingId")} />
              </Col>
              <Col span={24} className="px-2 py-1">
                <label className="mb-1 fw-bolder">Address:</label>
                <TextArea className=" border-2 rounded-2" type="number" name="trackingId" placeholder="Enter Your Address" value={form.trackingId} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "status")} />
              </Col>
              <Col span={24} className="px-2 py-1">
                <label className=" fw-bolder">Contact Number:</label>
                <Input className="my-2 border-2 rounded-2" type="text" name="status" placeholder="Courier Status" value={form.status} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "amount")} />
              </Col>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="border-1 border-black rounded-5">
              <Row>
                <Col span={12} className="px-2 py-1">
                  <label className="fw-bolder mb-1">Date:</label>
                  <Input type="date" className="mb-1" name="date" />
                </Col>
                <Col span={12} className="px-2 py-1">
                  <label className="mb-1 fw-bolder">CN Number:</label>
                  <Input type="number" className="mb-1" name="cnNumber" />
                </Col>
              </Row>
              <Col span={24} className="px-2 py-1">
                <label className="mb-1 fw-bolder">Shipper:</label>
                <Input className="border-2 rounded-2" type="text" name="name" placeholder="Add Shipment Name" value={form.name} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "trackingId")} />
              </Col>
              <Col span={24} className="px-2 py-1">
                <label className="mb-1 fw-bolder">Address:</label>
                <TextArea className=" border-2 rounded-2" type="number" name="trackingId" placeholder="Enter Your Address" value={form.trackingId} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "status")} />
              </Col>
              <Col span={24} className="px-2 py-1">
                <label className=" fw-bolder">Contact Number:</label>
                <Input className="my-2 border-2 rounded-2" type="text" name="status" placeholder="Courier Status" value={form.status} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "amount")} />
              </Col>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </main>
  );
};

export default AddShipment;



{/* <Input className="my-2 border-2 rounded-2" type="text" name="name" placeholder="Add Shipment Name" value={form.name} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "trackingId")} />
<Input className="my-2 border-2 rounded-2" type="number" name="trackingId" placeholder="Tracking ID" value={form.trackingId} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "status")} />
<Input className="my-2 border-2 rounded-2" type="text" name="status" placeholder="Courier Status" value={form.status} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "amount")} />
<Input className="my-2 border-2 rounded-2" type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} onKeyDown={(e) => handleKeyPress(e, "submit")} /> */}



