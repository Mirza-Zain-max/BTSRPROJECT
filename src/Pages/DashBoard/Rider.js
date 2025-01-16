import { Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Rider = () => {
    const [form, setForm] = useState({ name: "", contact: "", address: "" });
    const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };
    const handleAddCourier = () => {
        const { name, contact, address } = form;
        if (name && contact && address) {
            const timestamp = new Date().toISOString(); // Current date and time
            const savedCouriers = localStorage.getItem("couriers");
            const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];
            const updatedCouriers = [
                ...couriers,
                { ...form, createdAt: timestamp },
            ];
            localStorage.setItem("couriers", JSON.stringify(updatedCouriers));
            setForm({ name: "", contact: "", address: "" });
            message.success("Rider created successfully!");
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
        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            <div className="Rider">
                <h1 className="display-5 ">Add Rider</h1>
                <Form>
                    <Card className="border-2 border-bottom border-black">
                        <label>
                            <span className="fw-bolder fs-6"> Rider Name</span>
                        </label>
                        <Input className="my-2 border-2 rounded-2" type="text" name="name" placeholder="Rider Name" value={form.name} onKeyDown={(e)=>handleKeyPress(e,'contact')} onChange={handleChange} />
                        <label>
                            <span className="fw-bolder fs-6"> Rider Contact</span>
                        </label>
                        <Input className="my-2 border-2 rounded-2" type="number" name="contact" placeholder="Rider Contact" value={form.contact} onKeyDown={(e)=>handleKeyPress(e,'address')} onChange={handleChange} />
                        <label>
                            <span className="fw-bolder fs-6"> Address</span>
                        </label>
                        <Input className="my-2 border-2 rounded-2" type="text" name="address" placeholder="Address" value={form.address} onKeyDown={(e)=>handleKeyPress(e,'submit')} onChange={handleChange} />
                        {/* <label>
                            <span className="fw-bolder fs-6"> Consignee Number</span>
                        </label>
                        <Input className="my-2 border-2 rounded-2" type="text" name="consigneeNumber" placeholder="Consignee Number" value={form.consigneeNumber} onKeyDown={(e)=>handleKeyPress(e,'reciverName')} onChange={handleChange} />
                        <label>
                            <span className="fw-bolder fs-6">Reciver Name</span>
                        </label>
                        <Input className="my-2 border-2 rounded-2" type="text" name="reciverName" placeholder="Reciver Name" value={form.reciverName} onKeyDown={(e)=>handleKeyPress(e,'submit')} onChange={handleChange} /> */}
                        <div className="d-flex justify-content-center align-items-center">
                            <Button className="btn btn-success justify-content-center w-50 align-items-center d-flex" onClick={handleAddCourier}>Add Rider</Button>
                        </div>
                    </Card>
                </Form>
            </div>
        </main>
    );
};
export default Rider;
