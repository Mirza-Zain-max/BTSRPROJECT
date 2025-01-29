// import { Table, Card, Select, DatePicker, Row, Col, Button, Input, message } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
// import { collection, getDocs, query } from "firebase/firestore";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const inputRefs = useRef([]);

//     // Load data on component mount
//     useEffect(() => {
//         setLoading(true);

//         const fetchData = async () => {
//             try {
//                 // Fetch saved deliveries
//                 const deliveriesQuery = query(collection(fireStore, "deliveries"));
//                 const deliveriesSnapshot = await getDocs(deliveriesQuery);
//                 const deliveries = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Deliveries Loaded:", deliveries);
//                 setData(deliveries);
//                 setFilteredData(deliveries);

//                 // Fetch riders data
//                 const ridersQuery = query(collection(fireStore, "riders"));
//                 const ridersSnapshot = await getDocs(ridersQuery);
//                 const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Riders Loaded:", ridersList);
//                 setRiders(ridersList);

//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 message.error("Failed to fetch data from Firestore!");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Filter data by rider and date
//     const filterData = (rider, date) => {
//         const filtered = data.filter((item) => {
//             const matchesRider = rider === "All" || item.riderId === rider;
//             const matchesDate = date ? item.date === date : true;
//             return matchesRider && matchesDate;
//         });
//         setFilteredData(filtered);
//     };

//     // Handle rider selection change
//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//         filterData(value, selectedDate);
//     };

//     // Handle date selection change
//     const handleDateChange = (date, dateString) => {
//         setSelectedDate(dateString);
//         filterData(selectedRider, dateString);
//     };

//     // Update receiver name in data
//     const updateReceiverName = (cnNumber, value) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.cnNumber === cnNumber ? { ...item, receiverName: value } : item
//             )
//         );
//     };

//     // Save filtered data to Firestore
//     const handleSave = async () => {
//         try {
//             const batch = fireStore.batch();
//             filteredData.forEach((item) => {
//                 const docRef = fireStore.collection("filteredDeliveries").doc(item.id);
//                 batch.set(docRef, item);
//             });
//             await batch.commit();
//             message.success("Filtered data saved successfully!");
//         } catch (error) {
//             console.error("Error saving filtered data: ", error);
//             message.error("Failed to save filtered data!");
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             <Select
//                                 name="riderName"
//                                 className="my-2 w-100"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All Riders</Option>
//                                 {riders.map((rider) => (
//                                     <Option key={rider.id} value={rider.id}>
//                                         {rider.name}
//                                     </Option>
//                                 ))}
//                             </Select>
//                             <DatePicker
//                                 onChange={handleDateChange}
//                                 className="w-50"
//                             />
//                             <Button
//                                 type="primary"
//                                 className="mb-3"
//                                 onClick={handleSave}
//                             >
//                                 Save Filtered Data
//                             </Button>
//                             <Table
//                                 loading={loading}
//                                 dataSource={filteredData}
//                                 rowKey={(record) => record.id} // Ensure unique rowKey
//                                 pagination={false}
//                                 columns={[
//                                     {
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) => {
//                                             const rider = riders.find(
//                                                 (r) => r.id === record.riderId
//                                             );
//                                             return rider?.name || "Unknown";
//                                         },
//                                     },
//                                     {
//                                         title: "CN Number",
//                                         dataIndex: "cnNumber",
//                                         key: "cnNumber",
//                                     },
//                                     {
//                                         title: "Consignee Name",
//                                         dataIndex: "consigneeName",
//                                         key: "consigneeName",
//                                     },
//                                     {
//                                         title: "Receiver Name",
//                                         key: "receiverName",
//                                         render: (record, _, index) => (
//                                             <Input
//                                                 defaultValue={record.receiverName}
//                                                 ref={(ref) =>
//                                                     (inputRefs.current[index] = ref)
//                                                 }
//                                                 onChange={(e) =>
//                                                     updateReceiverName(
//                                                         record.cnNumber,
//                                                         e.target.value
//                                                     )
//                                                 }
//                                             />
//                                         ),
//                                     },
//                                     {
//                                         title: "Date",
//                                         dataIndex: "date",
//                                         key: "date",
//                                     },
//                                 ]}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;

// import { Table, Card, Select, DatePicker, Row, Col, Button, Input, message } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
// import { collection, getDocs, query, writeBatch } from "firebase/firestore";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const inputRefs = useRef([]);

//     // Load data on component mount
//     useEffect(() => {
//         setLoading(true);

//         const fetchData = async () => {
//             try {
//                 // Fetch saved deliveries
//                 const deliveriesQuery = query(collection(fireStore, "deliveries"));
//                 const deliveriesSnapshot = await getDocs(deliveriesQuery);
//                 const deliveries = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Deliveries Loaded:", deliveries);
//                 setData(deliveries);
//                 setFilteredData(deliveries);
//                 // Fetch riders data
//                 const ridersQuery = query(collection(fireStore, "riders"));
//                 const ridersSnapshot = await getDocs(ridersQuery);
//                 const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Riders Loaded:", ridersList);
//                 setRiders(ridersList);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 message.error("Failed to fetch data from Firestore!");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Filter data by rider and date
//     const filterData = (rider, date) => {
//         const filtered = data.filter((item) => {
//             const matchesRider = rider === "All" || item.riderId === rider;
//             const matchesDate = date ? item.date === date : true;
//             return matchesRider && matchesDate;
//         });
//         setFilteredData(filtered);
//     };

//     // Handle rider selection change
//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//         filterData(value, selectedDate);
//     };

//     // Handle date selection change
//     const handleDateChange = (date, dateString) => {
//         setSelectedDate(dateString);
//         filterData(selectedRider, dateString);
//     };

//     // Update receiver name in data
//     const updateReceiverName = (cnNumber, value) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.cnNumber === cnNumber ? { ...item, receiverName: value } : item
//             )
//         );
//     };

//     // Handle key press to focus on the next input field
//     const handleKeyPress = (e, index) => {
//         if (e.key === "Enter" && inputRefs.current[index + 1]) {
//             inputRefs.current[index + 1].focus();
//         }
//     };

//     // Save filtered data to Firestore
//     const handleSave = async () => {
//         try {
//             const batch = writeBatch(fireStore);
//             filteredData.forEach((item) => {
//                 const docRef = collection(fireStore, "deliveries").doc(item.id);
//                 batch.update(docRef, { receiverName: item.receiverName });
//             });
//             await batch.commit();
//             message.success("Receiver names saved successfully!");
//         } catch (error) {
//             console.error("Error saving receiver names: ", error);
//             message.error("Failed to save receiver names!");
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             <Select
//                                 name="riderName"
//                                 className="my-2 w-100"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All Riders</Option>
//                                 {riders.map((rider) => (
//                                     <Option key={rider.id} value={rider.id}>
//                                         {rider.name}
//                                     </Option>
//                                 ))}
//                             </Select>
//                             <DatePicker
//                                 onChange={handleDateChange}
//                                 className="w-50"
//                             />
//                             <Button
//                                 type="primary"
//                                 className="mb-3"
//                                 onClick={handleSave}
//                             >
//                                 Save Receiver Names
//                             </Button>
//                             <Table
//                                 loading={loading}
//                                 dataSource={filteredData}
//                                 rowKey={(record) => record.id} // Ensure unique rowKey
//                                 pagination={false}
//                                 columns={[
//                                     {
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) => {
//                                             const rider = riders.find(
//                                                 (r) => r.id === record.riderId
//                                             );
//                                             return rider?.name || "Unknown";
//                                         },
//                                     },
//                                     {
//                                         title: "CN Number",
//                                         dataIndex: "cnNumber",
//                                         key: "cnNumber",
//                                     },
//                                     {
//                                         title: "Consignee Name",
//                                         dataIndex: "consigneeName",
//                                         key: "consigneeName",
//                                     },
//                                     {
//                                         title: "Receiver Name",
//                                         key: "receiverName",
//                                         render: (record, _, index) => (
//                                             <Input
//                                                 defaultValue={record.receiverName}
//                                                 ref={(ref) =>
//                                                     (inputRefs.current[index] = ref)
//                                                 }
//                                                 onChange={(e) =>
//                                                     updateReceiverName(
//                                                         record.cnNumber,
//                                                         e.target.value
//                                                     )
//                                                 }
//                                                 onKeyDown={(e) => handleKeyPress(e, index)}
//                                             />
//                                         ),
//                                     },
//                                     {
//                                         title: "Date",
//                                         dataIndex: "date",
//                                         key: "date",
//                                     },
//                                 ]}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;


// import { Table, Card, Select, DatePicker, Row, Col, Button, Input, message } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";
// import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
// import { collection, getDocs, query, writeBatch, doc, addDoc } from "firebase/firestore";
// import { set } from "lodash";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [newReciver , setNewReciver] = useState({reciverName : ""});
//     const [loading, setLoading] = useState(true);
//     const inputRefs = useRef([]);

//     // Load data on component mount
//     useEffect(() => {
//         setLoading(true);

//         const fetchData = async () => {
//             try {
//                 // Fetch saved deliveries
//                 const deliveriesQuery = query(collection(fireStore, "deliveries"));
//                 const deliveriesSnapshot = await getDocs(deliveriesQuery);
//                 const deliveries = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Deliveries Loaded:", deliveries);
//                 setData(deliveries);
//                 setFilteredData(deliveries);
//                 // setNewReciver(deliveries);
//                 // Fetch riders data
//                 const ridersQuery = query(collection(fireStore, "riders"));
//                 const ridersSnapshot = await getDocs(ridersQuery);
//                 const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Riders Loaded:", ridersList);
//                 setRiders(ridersList);
//                 setNewReciver(ridersList);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 message.error("Failed to fetch data from Firestore!");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleReciverChange = (e) => {
//         const { name, value } = e.target;
//         setNewReciver((prev) => ({ ...prev, [name]: value }));
//     };
//      const handleSaveReciver = async () => {
//             if (!newReciver.reciverName) {
//                 message.error("Please fill all fields!");
//                 return;
//             }
    
//             // // Check if a rider with the same name already exists
//             // const duplicate = riders.find((rider) => rider.name.toLowerCase() === newRider.name.toLowerCase());
//             // if (duplicate) {
//             //     message.error("Rider with this name already exists!");
//             //     return;
//             // }
    
//             try {
//                 const docRef = await addDoc(collection(fireStore, "riders"), newReciver);
//                 setRiders((prevRiders) => [...prevRiders, { id: docRef.id, ...newReciver }]);
//                 setNewReciver({ reciverName: "" });
//                 message.success("Reciver added successfully!");
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//                 message.error("Error adding reciver!");
//             }
//         };


//     // Filter data by rider and date
//     const filterData = (rider, date) => {
//         const filtered = data.filter((item) => {
//             const matchesRider = rider === "All" || item.riderId === rider;
//             const matchesDate = date ? item.date === date : true;
//             return matchesRider && matchesDate;
//         });
//         setFilteredData(filtered);
//     };

//     // Handle rider selection change
//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//         filterData(value, selectedDate);
//     };

//     // Handle date selection change
//     const handleDateChange = (date, dateString) => {
//         setSelectedDate(dateString);
//         filterData(selectedRider, dateString);
//     };

//     // Update receiver name in data
//     const updateReceiverName = (cnNumber, value) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.cnNumber === cnNumber ? { ...item, receiverName: value } : item
//             )
//         );
//     };

//     // Handle key press to focus on the next input field
//     const handleKeyPress = (e, index) => {
//         if (e.key === "Enter" && inputRefs.current[index + 1]) {
//             inputRefs.current[index + 1].focus();
//         }
//     };

//     // Save filtered data to Firestore
//     const handleSave = async () => {
//         try {
//             const batch = writeBatch(fireStore);
//             filteredData.forEach((item) => {
//                 const docRef = doc(fireStore, "deliveries", item.id);
//                 batch.update(docRef, { receiverName: item.receiverName });
//             });
//             await batch.commit();
//             message.success("Receiver names saved successfully!");
//         } catch (error) {
//             console.error("Error saving receiver names: ", error);
//             message.error("Failed to save receiver names!");
//         }
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             <Select
//                                 name="riderName"
//                                 className="my-2 w-100"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All Riders</Option>
//                                 {riders.map((rider) => (
//                                     <Option key={rider.id} value={rider.id}>
//                                         {rider.name}
//                                     </Option>
//                                 ))}
//                             </Select>
//                             <DatePicker
//                                 onChange={handleDateChange}
//                                 className="w-50"
//                             />
//                             <Button
//                                 type="primary"
//                                 className="mb-3"
//                                 onClick={handleSaveReciver}
//                             >
//                                 Save Receiver Names
//                             </Button>
//                             <Table
//                                 loading={loading}
//                                 dataSource={filteredData}
//                                 rowKey={(record) => record.id} // Ensure unique rowKey
//                                 pagination={false}
//                                 columns={[
//                                     {
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) => {
//                                             const rider = riders.find(
//                                                 (r) => r.id === record.riderId
//                                             );
//                                             return rider?.name || "Unknown";
//                                         },
//                                     },
//                                     {
//                                         title: "CN Number",
//                                         dataIndex: "cnNumber",
//                                         key: "cnNumber",
//                                     },
//                                     {
//                                         title: "Consignee Name",
//                                         dataIndex: "consigneeName",
//                                         key: "consigneeName",
//                                     },
//                                     {
//                                         title: "Receiver Name",
//                                         key: "receiverName",
//                                         render: (record, _, index) => (
//                                             <Input onChange={handleReciverChange}
//                                                 defaultValue={record.receiverName}
//                                                 ref={(ref) =>
//                                                     (inputRefs.current[index] = ref)
//                                                 }
                                                
//                                                 onKeyDown={(e) => handleKeyPress(e, index)}
//                                             />
//                                         ),
//                                     },
//                                     {
//                                         title: "Date",
//                                         dataIndex: "date",
//                                         key: "date",
//                                     },
//                                 ]}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;

import { Table, Card, Select, DatePicker, Row, Col, Button, Input, message } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { fireStore } from "../../Config/firebase"; // Adjust the import path as needed
import { collection, getDocs, query, writeBatch, doc } from "firebase/firestore";

const { Option } = Select;

const ShowData = () => {
    const [data, setData] = useState([]);
    const [riders, setRiders] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRider, setSelectedRider] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputRefs = useRef([]);
    const [newReceiver, setNewReceiver] = useState({});

    // Load data on component mount
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                // Fetch saved deliveries
                const deliveriesQuery = query(collection(fireStore, "deliveries"));
                const deliveriesSnapshot = await getDocs(deliveriesQuery);
                const deliveries = deliveriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Deliveries Loaded:", deliveries);
                setData(deliveries);
                setFilteredData(deliveries);

                // Fetch riders data
                const ridersQuery = query(collection(fireStore, "riders"));
                const ridersSnapshot = await getDocs(ridersQuery);
                const ridersList = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Riders Loaded:", ridersList);
                setRiders(ridersList);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                message.error("Failed to fetch data from Firestore!");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter data by rider and date
    const filterData = (rider, date) => {
        const filtered = data.filter((item) => {
            const matchesRider = rider === "All" || item.riderId === rider;
            const matchesDate = date ? item.date === date : true;
            return matchesRider && matchesDate;
        });
        setFilteredData(filtered);
    };

    // Handle rider selection change
    const handleRiderChange = (value) => {
        setSelectedRider(value);
        filterData(value, selectedDate);
    };

    // Handle date selection change
    const handleDateChange = (date, dateString) => {
        setSelectedDate(dateString);
        filterData(selectedRider, dateString);
    };

    // Update receiver name in data
    const handleReciverChange = (e, cnNumber) => {
        const { value } = e.target;
        setNewReceiver((prev) => ({ ...prev, [cnNumber]: value }));
    };

    // Handle key press to focus on the next input field
    const handleKeyPress = (e, index) => {
        if (e.key === "Enter" && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Save filtered data to Firestore
    const handleSaveReciver = async () => {
        try {
            const batch = writeBatch(fireStore);
            filteredData.forEach((item) => {
                if (newReceiver[item.cnNumber]) {
                    const docRef = doc(fireStore, "deliveries", item.id);
                    batch.update(docRef, { receiverName: newReceiver[item.cnNumber] });
                }
            });
            await batch.commit();
            message.success("Receiver names saved successfully!");
        } catch (error) {
            console.error("Error saving receiver names: ", error);
            message.error("Failed to save receiver names!");
        }
    };

    return (
        <main className="d-flex justify-content-center align-items-center">
            <Container className="m">
                <Row>
                    <Col span={24}>
                        <h1>Show Data</h1>
                        <Card>
                            <Select
                                name="riderName"
                                className="my-2 w-100"
                                value={selectedRider}
                                onChange={handleRiderChange}
                            >
                                <Option value="All">All Riders</Option>
                                {riders.map((rider) => (
                                    <Option key={rider.id} value={rider.id}>
                                        {rider.name}
                                    </Option>
                                ))}
                            </Select>
                            <DatePicker
                                onChange={handleDateChange}
                                className="w-50"
                            />
                            <Button
                                type="primary"
                                className="mb-3"
                                onClick={handleSaveReciver}
                            >
                                Save Receiver Names
                            </Button>
                            <Table
                                loading={loading}
                                dataSource={filteredData}
                                rowKey={(record) => record.id} // Ensure unique rowKey
                                pagination={false}
                                columns={[
                                    {
                                        title: "Rider Name",
                                        key: "riderName",
                                        render: (record) => {
                                            const rider = riders.find(
                                                (r) => r.id === record.riderId
                                            );
                                            return rider?.name || "Unknown";
                                        },
                                    },
                                    {
                                        title: "CN Number",
                                        dataIndex: "cnNumber",
                                        key: "cnNumber",
                                    },
                                    {
                                        title: "Consignee Name",
                                        dataIndex: "consigneeName",
                                        key: "consigneeName",
                                    },
                                    {
                                        title: "Receiver Name",
                                        key: "receiverName",
                                        render: (record, _, index) => (
                                            <Input
                                                defaultValue={record.receiverName}
                                                ref={(ref) =>
                                                    (inputRefs.current[index] = ref)
                                                }
                                                onChange={(e) =>
                                                    handleReciverChange(e, record.cnNumber)
                                                }
                                                onKeyDown={(e) => handleKeyPress(e, index)}
                                            />
                                        ),
                                    },
                                    {
                                        title: "Date",
                                        dataIndex: "date",
                                        key: "date",
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default ShowData;