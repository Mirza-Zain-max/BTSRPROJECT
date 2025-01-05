import React, { useState } from "react";

function AddShipment() {
  const [shipment, setShipment] = useState({
    trackingId: "",
    customerName: "",
    address: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!shipment.trackingId.trim()) newErrors.trackingId = "Tracking ID is required.";
    if (!shipment.customerName.trim()) newErrors.customerName = "Customer Name is required.";
    if (!shipment.address.trim()) newErrors.address = "Address is required.";
    return newErrors;
  };

  const saveToLocalStorage = (newShipment) => {
    // Retrieve existing shipments from localStorage
    const existingShipments = JSON.parse(localStorage.getItem("shipments")) || [];
    
    // Add the new shipment to the list
    existingShipments.push(newShipment);
    
    // Save the updated list back to localStorage
    localStorage.setItem("shipments", JSON.stringify(existingShipments));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Shipment added:", shipment);
    saveToLocalStorage(shipment);
    alert("Shipment successfully added!");
    
    // Reset form fields
    setShipment({
      trackingId: "",
      customerName: "",
      address: "",
      status: "Pending",
    });

    setErrors({});
  };

  return (
    <div>
      <h1>Add Shipment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Tracking ID"
            value={shipment.trackingId}
            onChange={(e) => setShipment({ ...shipment, trackingId: e.target.value })}
            required
          />
          {errors.trackingId && <p style={{ color: "red" }}>{errors.trackingId}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Customer Name"
            value={shipment.customerName}
            onChange={(e) => setShipment({ ...shipment, customerName: e.target.value })}
            required
          />
          {errors.customerName && <p style={{ color: "red" }}>{errors.customerName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            value={shipment.address}
            onChange={(e) => setShipment({ ...shipment, address: e.target.value })}
            required
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>
        {/* <div>
          <label>Status:</label>
          <select
            value={shipment.status}
            onChange={(e) => setShipment({ ...shipment, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div> */}
        <button type="submit">Add Shipment</button>
      </form>
    </div>
  );
}

export default AddShipment;
