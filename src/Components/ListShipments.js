import React, { useState } from "react";

function ListShipments() {
  const [shipments] = useState([
    { trackingId: "12345", customerName: "John Doe", status: "In Transit" },
    { trackingId: "67890", customerName: "Jane Smith", status: "Delivered" },
  ]);

  return (
    <div>
      <h1>All Shipments</h1>
      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.trackingId}>
              <td>{shipment.trackingId}</td>
              <td>{shipment.customerName}</td>
              <td>{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListShipments;
