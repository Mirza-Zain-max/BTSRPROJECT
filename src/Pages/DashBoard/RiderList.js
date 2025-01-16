import { Card, Form, Input, Select, message, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const { Option } = Select;

const RiderList = () => {
  const [form, setForm] = useState({ consignee: "", cnnumber: "", rider: "" });
  const [riders, setRiders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch riders from localStorage on component mount
  useEffect(() => {
    const savedRiders = localStorage.getItem("couriers");
    if (savedRiders) {
      setRiders(JSON.parse(savedRiders));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRiderChange = (value) => {
    setForm({ ...form, rider: value });
  };

  const handleAddCourier = () => {
    const { consignee, cnnumber, rider } = form;

    if (consignee && cnnumber && rider) {
      const timestamp = new Date().toISOString(); // Current date and time
      const savedCouriers = localStorage.getItem("courierData");
      const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];

      // Add new courier
      const updatedCouriers = [
        ...couriers,
        { consignee, cnnumber, rider, createdAt: timestamp },
      ];

      localStorage.setItem("courierData", JSON.stringify(updatedCouriers));
      setForm({ consignee: "", cnnumber: "", rider: "" });
      message.success("Courier added successfully!");
    } else {
      message.error("Please fill all fields!");
    }
  };

  const handleFilter = () => {
    const savedCouriers = localStorage.getItem("courierData");
    const couriers = savedCouriers ? JSON.parse(savedCouriers) : [];
    const filtered = couriers.filter((courier) => {
      const courierDate = new Date(courier.createdAt).toLocaleDateString();
      const selectedDateFormatted = new Date(selectedDate).toLocaleDateString();
      return (
        courier.rider === selectedRider &&
        courierDate === selectedDateFormatted
      );
    });
    setFilteredData(filtered);

    if (filtered.length === 0) {
      message.warning("No data found for the selected rider and date.");
    }
  };

  return (
    <main
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="Rider">
        <h1 className="display-5">Add Courier</h1>
        <Form>
          <Card className="border-2 border-bottom border-black">
            <label>
              <span className="fw-bolder fs-6">Select Rider</span>
            </label>
            <Select
              className="my-2 w-100"
              placeholder="Select a rider"
              value={form.rider}
              onChange={handleRiderChange}
            >
              {riders.map((rider, index) => (
                <Option key={index} value={rider.name}>
                  {rider.name}
                </Option>
              ))}
            </Select>
            <label>
              <span className="fw-bolder fs-6">Consignee</span>
            </label>
            <Input
              className="my-2 border-2 rounded-2"
              type="text"
              name="consignee"
              placeholder="Consignee"
              value={form.consignee}
              onChange={handleChange}
            />
            <label>
              <span className="fw-bolder fs-6">CN Number</span>
            </label>
            <Input
              className="my-2 border-2 rounded-2"
              type="text"
              name="cnnumber"
              placeholder="CN Number"
              value={form.cnnumber}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Button
                className="btn btn-success justify-content-center w-50 align-items-center d-flex"
                onClick={handleAddCourier}
              >
                Add Courier
              </Button>
            </div>
          </Card>
        </Form>
      </div>
    </main>
  );
};

export default RiderList;
