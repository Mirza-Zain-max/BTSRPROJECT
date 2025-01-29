import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { collection, addDoc, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { fireStore } from "../../Config/firebase";

const AddRider = () => {
    const { Title } = Typography;
    const [newRider, setNewRider] = useState({ name: "", contact: "", address: "" });
    const [riders, setRiders] = useState([]);
    const inputRefs = useRef([]);
    const riderNameRef = useRef(null);

    useEffect(() => {
        const fetchRiders = async () => {
            const q = query(collection(fireStore, "riders"));
            const querySnapshot = await getDocs(q);
            const ridersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRiders(ridersList);
        };
        fetchRiders();
    }, []);

    const handleRiderChange = (e) => {
        const { name, value } = e.target;
        setNewRider((prev) => ({ ...prev, [name]: value }));
    };
    const handleKeyPress = (e, index) => {
        if (e.key === "Enter") {
            if (index === "submit") {
                saveRider();
            } else if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    const saveRider = async () => {
        if (!newRider.name || !newRider.contact || !newRider.address) {
            message.error("Please fill all fields!");
            return;
        }
        const duplicate = riders.find((rider) => rider.name.toLowerCase() === newRider.name.toLowerCase());
        if (duplicate) {
            message.error("Rider with this name already exists!");
            return;
        }
        try {
            const docRef = await addDoc(collection(fireStore, "riders"), newRider);
            setRiders((prevRiders) => [...prevRiders, { id: docRef.id, ...newRider }]);
            setNewRider({ name: "", contact: "", address: "" });
            message.success("Rider added successfully!");
            riderNameRef.current.focus(); // Focus back to the Rider Name input
        } catch (e) {
            console.error("Error adding document: ", e);
            message.error("Error adding rider!");
        }
    };
    const deleteRider = async () => {
        if (!newRider.name) {
            message.error("Please enter rider name to delete.");
            return;
        }
        const riderToDelete = riders.find(
            (rider) => rider.name.toLowerCase() === newRider.name.toLowerCase()
        );
        if (!riderToDelete) {
            message.error("Rider not found!");
            return;
        }
        try {
            await deleteDoc(doc(fireStore, "riders", riderToDelete.id));
            setRiders(riders.filter((rider) => rider.id !== riderToDelete.id));
            setNewRider({ name: "", contact: "", address: "" });
            message.success("Rider deleted successfully!");
            riderNameRef.current.focus(); // Focus back to the Rider Name input
        } catch (e) {
            console.error("Error deleting document: ", e);
            message.error("Error deleting rider!");
        } finally {
            console.log("done");
            message.success("Rider deleted successfully!");
        }
    };

    return (
        <main style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Title level={1}>Add Rider</Title>
                        <Card className="p-4 my-4 border-black">
                            <label>Rider Name:</label>
                            <Input type="text" className="my-2" name="name" value={newRider.name} onChange={handleRiderChange} placeholder="Enter rider name"
                                ref={(ref) => { inputRefs.current[0] = ref; riderNameRef.current = ref }}
                                onKeyDown={(e) => handleKeyPress(e, 0)} />
                            <label>Contact Number:</label>
                            <Input type="number" className="my-2" name="contact" value={newRider.contact} onChange={handleRiderChange} placeholder="Enter contact number"
                                ref={(ref) => inputRefs.current[1] = ref}
                                onKeyDown={(e) => handleKeyPress(e, 1)} />
                            <label>Address:</label>
                            <Input type="text" className="my-2" name="address" value={newRider.address} onChange={handleRiderChange} placeholder="Enter address"
                                ref={(ref) => inputRefs.current[2] = ref}
                                onKeyDown={(e) => handleKeyPress(e, "submit")} />
                            <Button className="me-2 mt-2" style={{ backgroundColor: "Green", color: "#fff" }} onClick={saveRider}>
                                Save Rider
                            </Button>
                            <Button className="me-2 mt-2 bg-danger" style={{ color: "#fff" }} onClick={deleteRider}>
                                Delete Rider
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default AddRider;