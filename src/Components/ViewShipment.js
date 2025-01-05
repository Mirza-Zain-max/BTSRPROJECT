import { message } from "antd";
import React, { useState } from "react";

function ViewShipment() {
    const [trackingId, setTrackingId] = useState("");
    const [shipmentDetails, setShipmentDetails] = useState(false);

    const handleSearch = () => {
        // Fetch shipment details (mocked)
        const mockData = {
            trackingId: "",
            customerName: "",
            address: "",
            status: "",
            rider : "",
        };

        if (trackingId === "12345") {
            setShipmentDetails(mockData);
        } else {
            message.error("Shipment not found.");
        }
    };

    return (
        <div>
            <h1>View Shipment</h1>
            <input
                type="text"
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {shipmentDetails && (
                <div>
                    <h2>Shipment Details</h2>
                    <p><b>Tracking ID:</b> {shipmentDetails.trackingId}</p>
                    <p><b>Customer Name:</b> {shipmentDetails.customerName}</p>
                    <p><b>Address:</b> {shipmentDetails.address}</p>
                    <p><b>Status:</b> {shipmentDetails.status}</p>
                    <p><b>Status:</b> {shipmentDetails.rider}</p>
                </div>
            )}
        </div>
    );
}

export default ViewShipment;
