import { message } from "antd";
import React, { useState } from "react";

function UpdateShipment() {
  const [trackingId, setTrackingId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleUpdate = () => {
    // Update logic here (mocked)
    console.log(`Updated shipment ${trackingId} to status: ${newStatus}`);
    message.error(`Shipment ${trackingId} status updated to ${newStatus}`);
  };

  return (
    <div>
      <h1>Update Shipment</h1>
      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button onClick={handleUpdate}>Update Status</button>
    </div>
  );
}

export default UpdateShipment;
