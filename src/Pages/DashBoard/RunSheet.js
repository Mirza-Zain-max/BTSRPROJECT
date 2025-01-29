// import React, { useState, useEffect, useRef } from "react";
// import { Button, Card, Col, Input, message, Row, Select, Typography } from "antd";
// import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase";

// const RunSheet = () => {
//     const { Title } = Typography;
//     const [riders, setRiders] = useState([]);
//     const [deliveries, setDeliveries] = useState([]);
//     const [delivery, setDelivery] = useState({ date: '', cnNumber: '', consigneeName: '' });
//     const cnNumberRef = useRef(null); // Ref for the CN Number input field

//     useEffect(() => {
//         const fetchRiders = async ()=>{
//             const q = query(collection(fireStore, "riders"));
//             const querySnapshot = await getDocs(q);
//             const ridersList = querySnapshot.docs.map(doc =>({id : doc.id , ...doc.data()}));
//             setRiders(ridersList);
//         }
//         fetchRiders();
//     },[]);

//     const handleDeliveryChange = (e, name = null) => {
//         if (name) {
//             setDelivery((prev) => ({ ...prev, [name]: e })); // For Select component
//         } else {
//             const { name, value } = e.target; // For Input components
//             setDelivery((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const saveDelivery = async (e) => {
//         e.preventDefault(); // Prevent page refresh
//         if ( !delivery.riderName ||!delivery.date || !delivery.cnNumber || !delivery.consigneeName) {
//             message.error('Please fill all fields!');
//             return;
//         }

//         const newDelivery = {
//             ...delivery,
//             // riderId: riders[delivery.riderId]?.id || "Unknown", // Store riderId instead of index
//             riderName: riders.find(rider => rider.id === delivery.riderName)?.name || "Unknown", // Add rider name for display
//         };
//         try{
//             const docRef = await addDoc(collection(fireStore, "deliveries"), newDelivery);
//             setDeliveries((prevDeliveries) => [...prevDeliveries, { id: docRef.id, ...newDelivery }]);
//             setDelivery({  date: '', cnNumber: '', consigneeName: '' }); // Reset fields   
//             message.success('Delivery saved successfully!');
//         }catch(error){
//             console.error("Error adding document: ", error);
//             message.error('Failed to save delivery!');
//     } finally {
//         // Focus back on the CN Number field
//         if (cnNumberRef.current) {
//             cnNumberRef.current.focus();
//         }
//     }
    

//         // Focus back on the CN Number field
//         if (cnNumberRef.current) {
//             cnNumberRef.current.focus();
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center">
//                     <Col>
//                         <Card className="border-2 border-bottom border-black">
//                             <Title level={1}>Make Delivery Sheet</Title>
//                             <form onSubmit={saveDelivery}>
//                                 <label className="fw-bolder my-2 me-3">Select Rider:</label>
//                                 <Select
//                                     name="riderId"
//                                     className="my-2 w-100"
//                                     value={delivery.riderName}
//                                     onChange={(value) => handleDeliveryChange(value, "riderName")}
//                                 >
//                                     <option value="" disabled>Select a rider</option>
//                                     {riders.map((rider, index) => (
//                                         <option key={index} value={index}>{rider.name}</option>
//                                     ))}
//                                 </Select>

//                                 <label className="fw-bolder mb-2">Date:</label>
//                                 <Input
//                                     type="date"
//                                     className="mb-2"
//                                     name="date"
//                                     value={delivery.date}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <label className="mb-2">CN Number:</label>
//                                 <Input
//                                     type="number"
//                                     className="mb-2"
//                                     name="cnNumber"
//                                     value={delivery.cnNumber}
//                                     onChange={handleDeliveryChange}
//                                     ref={cnNumberRef} // Attach the ref to this field
//                                 />

//                                 <label className="mb-2">Consignee Name:</label>
//                                 <Input
//                                     type="text"
//                                     className="mb-3"
//                                     name="consigneeName"
//                                     value={delivery.consigneeName}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <Button type="primary" htmlType="submit">Save Delivery</Button>
//                             </form>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default RunSheet;

// import { Button, Card, Col, Input, message, Row, Select, Typography } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
// import { collection, addDoc, getDocs, query } from "firebase/firestore";

// const { Option } = Select;

// const RunSheet = () => {
//     const { Title } = Typography;
//     const [riders, setRiders] = useState([]);
//     const [deliveries, setDeliveries] = useState([]);
//     const [delivery, setDelivery] = useState({ riderId: "", date: '', cnNumber: '', consigneeName: '' });
//     const cnNumberRef = useRef(null); // Ref for the CN Number input field

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
//             setDelivery((prev) => ({ ...prev, [name]: e })); // For Select component
//         } else {
//             const { name, value } = e.target; // For Input components
//             setDelivery((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const saveDelivery = async (e) => {
//         e.preventDefault(); // Prevent page refresh
//         if (!delivery.riderId || !delivery.date || !delivery.cnNumber || !delivery.consigneeName) {
//             message.error('Please fill all fields!');
//             return;
//         }

//         const selectedRider = riders.find(rider => rider.id === delivery.riderId);
//         const newDelivery = {
//             ...delivery,
//             riderName: selectedRider ? selectedRider.name : "Unknown", // Add rider name for display
//         };

//         try {
//             const docRef = await addDoc(collection(fireStore, "deliveries"), newDelivery);
//             setDeliveries((prevDeliveries) => [...prevDeliveries, { id: docRef.id, ...newDelivery }]);
//             setDelivery((prev) => ({
//                 ...prev,
//                 cnNumber: '',
//                 consigneeName: '',
//             })); // Reset specific fields
//             message.success('Delivery saved successfully!');
//         } catch (error) {
//             console.error("Error adding document: ", error);
//             message.error('Failed to save delivery!');
//         } finally {
//             // Focus back on the CN Number field
//             if (cnNumberRef.current) {
//                 cnNumberRef.current.focus();
//             }
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center">
//                     <Col>
//                         <Card className="border-2 border-bottom border-black">
//                             <Title level={1}>Make Delivery Sheet</Title>
//                             <form onSubmit={saveDelivery}>
//                                 <label className="fw-bolder my-2 me-3">Select Rider:</label>
//                                 <Select
//                                     name="riderId"
//                                     className="my-2 w-100"
//                                     value={delivery.riderId}
//                                     onChange={(value) => handleDeliveryChange(value, "riderId")}
//                                 >
//                                     <Option value="" disabled>Select a rider</Option>
//                                     {riders.map((rider) => (
//                                         <Option key={rider.id} value={rider.id}>{rider.name}</Option>
//                                     ))}
//                                 </Select>

//                                 <label className="fw-bolder mb-2">Date:</label>
//                                 <Input
//                                     type="date"
//                                     className="mb-2"
//                                     name="date"
//                                     value={delivery.date}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <label className="mb-2">CN Number:</label>
//                                 <Input
//                                     type="number"
//                                     className="mb-2"
//                                     name="cnNumber"
//                                     value={delivery.cnNumber}
//                                     onChange={handleDeliveryChange}
//                                     ref={cnNumberRef} // Attach the ref to this field
//                                 />

//                                 <label className="mb-2">Consignee Name:</label>
//                                 <Input
//                                     type="text"
//                                     className="mb-3"
//                                     name="consigneeName"
//                                     value={delivery.consigneeName}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <Button type="primary" htmlType="submit">Save Delivery</Button>
//                             </form>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default RunSheet;

import { Button, Card, Col, Input, message, Row, Select, Typography } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const { Option } = Select;

const RunSheet = () => {
    const { Title } = Typography;
    const [riders, setRiders] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [delivery, setDelivery] = useState({ riderId: "", date: '', cnNumber: '', consigneeName: '' });
    const cnNumberRef = useRef(null); // Ref for the CN Number input field

        console.log('deliveries', deliveries)
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
            setDelivery((prev) => ({ ...prev, [name]: e })); // For Select component
        } else {
            const { name, value } = e.target; // For Input components
            setDelivery((prev) => ({ ...prev, [name]: value }));
        }
    };

    const saveDelivery = async (e) => {
        e.preventDefault(); // Prevent page refresh
        if (!delivery.riderId || !delivery.date || !delivery.cnNumber || !delivery.consigneeName) {
            message.error('Please fill all fields!');
            return;
        }

        // Check if the CN number already exists
        const q = query(collection(fireStore, "deliveries"), where("cnNumber", "==", delivery.cnNumber));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return            message.error('CN Number already exists!');
        }

        const selectedRider = riders.find(rider => rider.id === delivery.riderId);
        const newDelivery = {
            ...delivery,
            riderName: selectedRider ? selectedRider.name : "Unknown", // Add rider name for display
        };

        try {
            const docRef = await addDoc(collection(fireStore, "deliveries"), newDelivery);
            setDeliveries((prevDeliveries) => [...prevDeliveries, { id: docRef.id, ...newDelivery }]);
            setDelivery((prev) => ({
                ...prev,
                cnNumber: '',
                consigneeName: '',
            })); // Reset specific fields
            message.success('Delivery saved successfully!');
        } catch (error) {
            console.error("Error adding document: ", error);
            message.error('Failed to save delivery!');
        } finally {
            // Focus back on the CN Number field
            if (cnNumberRef.current) {
                cnNumberRef.current.focus();
            }
        }
    };

    return (
        <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Card className="border-2 border-bottom border-black">
                            <Title level={1}>Make Delivery Sheet</Title>
                            <form onSubmit={saveDelivery}>
                                <label className="fw-bolder my-2 me-3">Select Rider:</label>
                                <Select
                                    name="riderId"
                                    className="my-2 w-100"
                                    value={delivery.riderId}
                                    onChange={(value) => handleDeliveryChange(value, "riderId")}
                                >
                                    <Option value="" disabled>Select a rider</Option>
                                    {riders.map((rider) => (
                                        <Option key={rider.id} value={rider.id}>{rider.name}</Option>
                                    ))}
                                </Select>

                                <label className="fw-bolder mb-2">Date:</label>
                                <Input
                                    type="date"
                                    className="mb-2"
                                    name="date"
                                    value={delivery.date}
                                    onChange={handleDeliveryChange}
                                />

                                <label className="mb-2">CN Number:</label>
                                <Input
                                    type="number"
                                    className="mb-2"
                                    name="cnNumber"
                                    value={delivery.cnNumber}
                                    onChange={handleDeliveryChange}
                                    ref={cnNumberRef} // Attach the ref to this field
                                />

                                <label className="mb-2">Consignee Name:</label>
                                <Input
                                    type="text"
                                    className="mb-3"
                                    name="consigneeName"
                                    value={delivery.consigneeName}
                                    onChange={handleDeliveryChange}
                                />

                                <Button type="primary" htmlType="submit">Save Delivery</Button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default RunSheet;
// import { Button, Card, Col, Input, message, Row, Select, Typography } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";

// const RunSheet = () => {
//     const { Title } = Typography;
//     const [riders, setRiders] = useState(JSON.parse(localStorage.getItem('riders')) || []);
//     const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//     const [delivery, setDelivery] = useState({ riderIndex: '', date: '', cnNumber: '', consigneeName: '' });
//     const cnNumberRef = useRef(null); // Ref for the CN Number input field

//     useEffect(() => {
//         localStorage.setItem('deliveries', JSON.stringify(deliveries));
//     }, [deliveries]);

//     const handleDeliveryChange = (e, name = null) => {
//         if (name) {
//             setDelivery(prev => ({ ...prev, [name]: e })); // For Select component
//         } else {
//             const { name, value } = e.target; // For Input components
//             setDelivery(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const saveDelivery = (e) => {
//         e.preventDefault(); // Prevent page refresh
//         if (!delivery.riderIndex || !delivery.date || !delivery.cnNumber || !delivery.consigneeName) {
//             message.error('Please fill all fields!');
//             return;
//         }

//         setDeliveries([...deliveries, { ...delivery, rider: riders[delivery.riderIndex]?.name || "Unknown" }]);
//         setDelivery(prev => ({
//             ...prev,
//             cnNumber: '',
//             consigneeName: '',
//         })); // Reset specific fields

//         message.success('Delivery saved successfully!');
        
//         // Focus back on the CN Number field
//         if (cnNumberRef.current) {
//             cnNumberRef.current.focus();
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//             <Container>
//                 <Row className="d-flex justify-content-center align-items-center">
//                     <Col>
//                         <Card className="border-2 border-bottom border-black">
//                             <Title level={1}>Make Delivery Sheet</Title>
//                             <form onSubmit={saveDelivery}>
//                                 <label className="fw-bolder my-2 me-3">Select Rider:</label>
//                                 <Select
//                                     name="riderIndex"
//                                     className="my-2 w-100"
//                                     value={delivery.riderIndex}
//                                     onChange={(value) => handleDeliveryChange(value, "riderIndex")}
//                                 >
//                                     <option value="" disabled>Select a rider</option>
//                                     {riders.map((rider, index) => (
//                                         <option key={index} value={index}>{rider.name}</option>
//                                     ))}
//                                 </Select>

//                                 <label className="fw-bolder mb-2">Date:</label>
//                                 <Input
//                                     type="date"
//                                     className="mb-2"
//                                     name="date"
//                                     value={delivery.date}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <label className="mb-2">CN Number:</label>
//                                 <Input
//                                     type="text"
//                                     className="mb-2"
//                                     name="cnNumber"
//                                     value={delivery.cnNumber}
//                                     onChange={handleDeliveryChange}
//                                     ref={cnNumberRef} // Attach the ref to this field
//                                 />

//                                 <label className="mb-2">Consignee Name:</label>
//                                 <Input
//                                     type="text"
//                                     className="mb-3"
//                                     name="consigneeName"
//                                     value={delivery.consigneeName}
//                                     onChange={handleDeliveryChange}
//                                 />

//                                 <Button type="primary" htmlType="submit">Save Delivery</Button>
//                             </form>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default RunSheet;
