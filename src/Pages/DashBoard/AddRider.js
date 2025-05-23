/* eslint-disable no-unused-vars */
import { Button, Card, Col, Input, message, Row, Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore";
import { fireStore } from "../../Config/firebase";
import { useAuthContext } from "../../Context/Auth";

const AddRider = () => {
    const { user } = useAuthContext();
    const { Title } = Typography;
    const [newRider, setNewRider] = useState({ name: "", contact: "", address: "" });
    const [riders, setRiders] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const riderNameRef = useRef(null);
    useEffect(() => {
        const fetchRiders = async () => {
            const q = query(collection(fireStore, "riders"), orderBy('createdAt'));
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
        setIsLoading(true); 
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
            const newRiderData = { ...newRider, Created_By: user.uid }; // Include Created_By field
            const docRef = await addDoc(collection(fireStore, "riders"), newRiderData);
            setRiders((prevRiders) => [...prevRiders, { id: docRef.id, ...newRiderData }]);
            setNewRider({ name: "", contact: "", address: "" });
            message.success("Rider added successfully!");
            riderNameRef.current.focus(); // Refocus on the Rider Name input
        } catch (e) {
            console.error("Error adding document:", e);
            message.error("Error adding rider!");
        }
        setIsLoading(false);
    };

    const deleteRider = async () => {
        setIsLoading(true); 
        if (!newRider.name) {
            message.error("Please enter rider name to delete.");
            return;
        }
        const riderToDelete = riders.find((rider) => rider.name.toLowerCase() === newRider.name.toLowerCase());
        if (!riderToDelete) {
            message.error("Rider not found!");
            return;
        }
        try {
            await deleteDoc(doc(fireStore, "riders", riderToDelete.id));
            setRiders(riders.filter((rider) => rider.id !== riderToDelete.id));
            setNewRider({ name: "", contact: "", address: "" });
            message.success("Rider deleted successfully!");
            riderNameRef.current.focus();
        } catch (e) {
            console.error("Error deleting document:", e);
            message.error("Error deleting rider!");
        }
        setIsLoading(false);
       
    };

    return (
        <main className="auth d-flex justify-content-center align-items-center">
            <Container >
            <span level={1} className="text  d-flex justify-content-center align-items-center display-3 fw-medium text-light "> Add Rider</span>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Card style={{ backgroundColor: "#d6d6d6" }} className="p-4 my-4 border-0 rounded-5 card2">
                            {/* <Title level={1} className="text-center text">Add Rider</Title> */}
                            <label className="fw-bold">Rider Name:</label>
                            <Input type="text" className="my-2" name="name" value={newRider.name} onChange={handleRiderChange} placeholder="Enter rider name" ref={(ref) => { inputRefs.current[0] = ref; riderNameRef.current = ref }} onKeyDown={(e) => handleKeyPress(e, 0)} />
                            <label className="fw-bold">Contact Number:</label>
                            <Input type="number" className="my-2" name="contact" value={newRider.contact} onChange={handleRiderChange} placeholder="Enter contact number" ref={(ref) => inputRefs.current[1] = ref} onKeyDown={(e) => handleKeyPress(e, 1)} />
                            <label className="fw-bold">Address:</label>
                            <Input type="text" className="my-2" name="address" value={newRider.address} onChange={handleRiderChange} placeholder="Enter address" ref={(ref) => inputRefs.current[2] = ref} onKeyDown={(e) => handleKeyPress(e, "submit")} />
                            <Button loading={isloading} className="me-2 border-0 rounded-pill mt-2" style={{ backgroundColor: "Green", color: "#fff" }} onClick={saveRider}>
                                Save Rider
                            </Button>
                            <Button className="me-2 border-0 mt-2 bg-danger rounded-pill" style={{ color: "#fff" }} onClick={deleteRider}>
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