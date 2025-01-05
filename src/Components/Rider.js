import { message } from "antd";
import React, { useState } from "react";

const Rider = () => {
    const [couriers, setCouriers] = useState([]);
    const [form, setForm] = useState({ name: "", trackingId: "", status: "", amount: "", });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddCourier = () => {
        if (form.name && form.trackingId && form.status && form.amount) {
            setCouriers([...couriers, { ...form }]);
            setForm({ name: "", trackingId: "", status: "", amount: "" });
        } else {
            message.error("Please fill all fields!");
        }
    };

    const handleDeleteCourier = (trackingId) => {
        setCouriers(couriers.filter((courier) => courier.trackingId !== trackingId));
    };

    return (
        <div className="Rider">
            <h1>Courier Company Billing & Tracking</h1>
            <div className="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="trackingId"
                    placeholder="Tracking ID"
                    value={form.trackingId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Courier Status (e.g., Delivered)"
                    value={form.status}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                />
                <button onClick={handleAddCourier}>Add Courier</button>
            </div>

            <div className="courier-list">
                <h2>Courier List</h2>
                {couriers.length > 0 ? (
                    couriers.map((courier) => (
                        <div key={courier.trackingId} className="courier-item">
                            <p><strong>Name:</strong> {courier.name}</p>
                            <p><strong>Tracking ID:</strong> {courier.trackingId}</p>
                            <p><strong>Status:</strong> {courier.status}</p>
                            <p><strong>Amount:</strong> ${courier.amount}</p>
                            <button onClick={() => handleDeleteCourier(courier.trackingId)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No couriers added yet.</p>
                )}
            </div>
        </div>
    );
};

export default Rider;
