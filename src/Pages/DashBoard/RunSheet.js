import { Button, Card, Col, Input, message, Popconfirm, Row, Select, Typography } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { fireStore } from "../../Config/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../Context/Auth";

const { Option } = Select;

const RunSheet = () => {
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false);
    const { Title } = Typography;
    const [riders, setRiders] = useState([]);
    const [shipper, setShipper] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [delivery, setDelivery] = useState({ riderId: "", date: '', cnNumber: '', consignee: '' });
    const cnNumberRef = useRef(null);

    useEffect(() => {
        const fetchRiders = async () => {
            const q = query(collection(fireStore, "riders"));
            const querySnapshot = await getDocs(q);
            const ridersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRiders(ridersList);
        };
        fetchRiders();
    }, []);
    const handleDeliveryChange = (e, name = null) => {
        if (name) {
            setDelivery((prev) => ({ ...prev, [name]: e }));
        } else {
            const { name, value } = e.target;
            setDelivery((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDelete = async (riderId) => {
        try {
            await deleteDoc(doc(fireStore, "riders", riderId));
            setRiders((prevRiders) => prevRiders.filter(rider => rider.id !== riderId));
            message.success("Rider deleted successfully!");
        } catch (error) {
            console.error("Error deleting rider: ", error);
            message.error("Failed to delete rider!");
        }
    };
    const saveDelivery = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!delivery.riderId || !delivery.date || !delivery.cnNumber || !delivery.consignee) {
            message.error('Please fill all fields!');
            return;
        }

        const selectedRider = riders.find(rider => rider.id === delivery.riderId);
        const newDelivery = {
            ...delivery,
            status: "On Route",
            userId: user.uid,
            riderName: selectedRider ? selectedRider.name : "",
            createdAt: Date.now(),
        };

        try {
            const shipperCollection = await getDocs(collection(fireStore, "shipper"));

            const existingDoc = shipperCollection.docs.find(doc => doc.data().cnNumber === newDelivery.cnNumber);

            if (existingDoc) {
                // Update the existing document in "shipper"
                await updateDoc(existingDoc.ref, {
                    status: "On Route",
                    riderId: delivery.riderId,
                    riderName: selectedRider ? selectedRider.name : "",
                });

                message.success('Rider added successfully!');
            } else {
                // If CN Number does not exist, add it to "deliveries"
                const docRef = await addDoc(collection(fireStore, "deliveries"), newDelivery);
                setDeliveries((prevDeliveries) => [...prevDeliveries, { id: docRef.id, ...newDelivery }]);
                message.success('Delivery saved successfully!');
            }

            // Reset CN Number and Consignee Name
            setDelivery((prev) => ({
                ...prev,
                cnNumber: '',
                consignee: '',
            }));

        } catch (error) {
            console.error("Error updating or adding document: ", error);
            message.error('Failed to save delivery!');
        } finally {
            if (cnNumberRef.current) {
                cnNumberRef.current.focus();
            }
        }
        console.log(newDelivery);
        setIsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (consigneeNameRef.current) {
                consigneeNameRef.current.focus();
            }
        }
    };
    const consigneeNameRef = useRef(null);
    return (
        <main className="d-flex justify-content-center align-items-center auth">
            <Container>
            <span level={1} className="text  d-flex justify-content-center align-items-center display-3 fw-medium text-light ">Make Delivery Sheet</span>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col span={22}>
                        <Card style={{ backgroundColor: "#d6d6d6" }} className="border-0 card2 mt-5 ">
                            <form onSubmit={saveDelivery}>
                                <label className="fw-bolder my-2 me-3">Select Rider:</label>
                                {riders.length === 0 ? (
                                    <p>No riders available</p>
                                ) : (
                                    <Select name="riderId" className="my-2 w-100" value={delivery.riderId} onChange={(value) => handleDeliveryChange(value, "riderId")} showSearch placeholder="Search Rider..."
                                        optionFilterProp="label" Use label instead of children
                                        filterOption={(input, option) =>
                                            option.label.toLowerCase().includes(input.toLowerCase())
                                        }>
                                        {riders.map((rider) => (
                                            <Option key={rider.id} value={rider.id} label={rider.name}>
                                                <span>{rider.name}</span>
                                                <Popconfirm title="Are you sure you want to delete this rider?" onConfirm={() => handleDelete(rider.id)} okText="Yes" cancelText="No" >
                                                    <Button type="link" className="align-self-center" danger>
                                                        Delete
                                                    </Button>
                                                </Popconfirm>
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                <label className="fw-bolder mb-2">Date:</label>
                                <Input type="date" className="mb-2" name="date" value={delivery.date} onChange={handleDeliveryChange} />
                                <label className="mb-2 fw-bolder">CN Number:</label>
                                <Input type="number" className="mb-2" name="cnNumber" value={delivery.cnNumber} onChange={handleDeliveryChange} ref={cnNumberRef} onKeyDown={(e) => handleKeyDown(e, "cnNumber")} />
                                <label className="mb-2 fw-bolder">Consignee Name:</label>
                                <Input type="text" className="mb-3" name="consignee" value={delivery.consignee} onChange={handleDeliveryChange} ref={consigneeNameRef} onKeyDown={(e) => handleKeyDown(e, "submit")} />
                                <Button style={{backgroundColor:"gray"}} htmlType="submit" className="text-light border-0" loading={isLoading}>Save Delivery</Button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default RunSheet;


// import { Button, Card, Col, Input, message, Popconfirm, Row, Select, Typography } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase";
// import { collection, addDoc, getDocs, deleteDoc, doc, query, updateDoc } from "firebase/firestore";
// import { useAuthContext } from "../../Context/Auth";

// const { Option } = Select;

// const RunSheet = () => {
//     const { user } = useAuthContext()
//     const { Title } = Typography;
//     const [riders, setRiders] = useState([]);
//     const [shipper, setShipper] = useState([]);
//     const [deliveries, setDeliveries] = useState([]);
//     const [delivery, setDelivery] = useState({ riderId: "", date: '', cnNumber: '', consignee: '' });
//     const cnNumberRef = useRef(null);

//     useEffect(() => {
//         const fetchRiders = async () => {
//             const q = query(collection(fireStore, "riders"));
//             const querySnapshot = await getDocs(q);
//             const ridersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setRiders(ridersList);
//         };
//         fetchRiders();
//     }, []);
//     const handleDeliveryChange = (e, name = null) => {
//         if (name) {
//             setDelivery((prev) => ({ ...prev, [name]: e }));
//         } else {
//             const { name, value } = e.target;
//             setDelivery((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleDelete = async (riderId) => {
//         try {
//             await deleteDoc(doc(fireStore, "riders", riderId));
//             setRiders((prevRiders) => prevRiders.filter(rider => rider.id !== riderId));
//             message.success("Rider deleted successfully!");
//         } catch (error) {
//             console.error("Error deleting rider: ", error);
//             message.error("Failed to delete rider!");
//         }
//     };
// const saveDelivery = async (e) => {
//     e.preventDefault();

//     if (!delivery.riderId || !delivery.date || !delivery.cnNumber || !delivery.consignee) {
//         message.error('Please fill all fields!');
//         return;
//     }

//     const selectedRider = riders.find(rider => rider.id === delivery.riderId);
//     const newDelivery = {
//         ...delivery,
//         status: "On Route",
//         userId: user.uid,
//         riderName: selectedRider ? selectedRider.name : "",
//         createdAt: Date.now(),
//     };

//     try {
//         const shipperCollection = await getDocs(collection(fireStore, "shipper"));

//         const existingDoc = shipperCollection.docs.find(doc => doc.data().cnNumber === newDelivery.cnNumber);

//         if (existingDoc) {
//             // Update the existing document in "shipper"
//             await updateDoc(existingDoc.ref, {
//                 status: "On Route",
//                 riderId: delivery.riderId,
//                 riderName: selectedRider ? selectedRider.name : "",
//             });

//             message.success('Rider added successfully!');
//         } else {
//             // If CN Number does not exist, add it to "deliveries"
//             const docRef = await addDoc(collection(fireStore, "deliveries"), newDelivery);
//             setDeliveries((prevDeliveries) => [...prevDeliveries, { id: docRef.id, ...newDelivery }]);
//             message.success('Delivery saved successfully!');
//         }

//         // Reset CN Number and Consignee Name
//         setDelivery((prev) => ({
//             ...prev,
//             cnNumber: '',
//             consignee: '',
//         }));

//     } catch (error) {
//         console.error("Error updating or adding document: ", error);
//         message.error('Failed to save delivery!');
//     } finally {
//         if (cnNumberRef.current) {
//             cnNumberRef.current.focus();
//         }
//     }
//     console.log(newDelivery);
// };

// const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//         e.preventDefault();
//         if (consigneeNameRef.current) {
//             consigneeNameRef.current.focus();
//         }
//     }
// };
// const consigneeNameRef = useRef(null);
// return (
//     <main className="d-flex justify-content-center align-items-center auth">
//         <Container>
//             <Row className="d-flex justify-content-center align-items-center">
//                 <Col span={22}>
//                     <Card style={{ backgroundColor: "#d6d6d6" }} className="border-2 border-bottom border-black">
//                         <Title level={1}>Make Delivery Sheet</Title>
//                         <form onSubmit={saveDelivery}>
//                             <label className="fw-bolder my-2 me-3">Select Rider:</label>
//                             {riders.length === 0 ? (
//                                 <p>No riders available</p>
//                             ) : (
//                                 <Select name="riderId" className="my-2 w-100" value={delivery.riderId} onChange={(value) => handleDeliveryChange(value, "riderId")} showSearch placeholder="Search Rider..."
//                                     optionFilterProp="label" Use label instead of children
//                                     filterOption={(input, option) =>
//                                         option.label.toLowerCase().includes(input.toLowerCase())
//                                     }>
//                                     {riders.map((rider) => (
//                                         <Option key={rider.id} value={rider.id} label={rider.name}>
//                                             <span>{rider.name}</span>
//                                             <Popconfirm title="Are you sure you want to delete this rider?" onConfirm={() => handleDelete(rider.id)} okText="Yes" cancelText="No" >
//                                                 <Button type="link" className="align-self-center" danger>
//                                                     Delete
//                                                 </Button>
//                                             </Popconfirm>
//                                         </Option>
//                                     ))}
//                                 </Select>
//                             )}
//                             <label className="fw-bolder mb-2">Date:</label>
//                             <Input type="date" className="mb-2" name="date" value={delivery.date} onChange={handleDeliveryChange} />
//                             <label className="mb-2">CN Number:</label>
//                             <Input type="number" className="mb-2" name="cnNumber" value={delivery.cnNumber} onChange={handleDeliveryChange} ref={cnNumberRef} onKeyDown={(e) => handleKeyDown(e, "cnNumber")} />
//                             <label className="mb-2">Consignee Name:</label>
//                             <Input type="text" className="mb-3" name="consignee" value={delivery.consignee} onChange={handleDeliveryChange} ref={consigneeNameRef} onKeyDown={(e) => handleKeyDown(e, "submit")} />
//                             <Button  type="primary" htmlType="submit">Save Delivery</Button>
//                         </form>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     </main>
// );
// };

// export default RunSheet;
