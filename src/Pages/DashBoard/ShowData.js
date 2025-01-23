// import { Table, Card, Select, DatePicker, Row, Col, Input, Button, message } from "antd";
// import React, { useState, useEffect, useRef } from "react";
// import { Container } from "react-bootstrap";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]); // Courier data
//     const [riders, setRiders] = useState([]); // Riders list
//     const [selectedRider, setSelectedRider] = useState("All"); // Rider filter
//     const [selectedDate, setSelectedDate] = useState(null); // Date filter
//     const [loading, setLoading] = useState(true); // Loading state
//     const inputRefs = useRef([]); // Refs to handle input focus

//     useEffect(() => {
//         const fetchData = () => {
//             setLoading(true);
//             const savedRiders = localStorage.getItem("couriers");
//             const savedCouriers = localStorage.getItem("courierData");

//             if (savedRiders) {
//                 setRiders(JSON.parse(savedRiders));
//             }
//             if (savedCouriers) {
//                 setData(JSON.parse(savedCouriers));
//             }

//             setTimeout(() => {
//                 setLoading(false);
//             }, 800);
//         };

//         fetchData();
//     }, []);

//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//     };

//     const handleDateChange = (date, dateString) => {
//         setSelectedDate({ date, dateString });
//     };

//     // Filtered data based on rider and date
//     const filteredData = data.filter((item) => {
//         const matchesRider =
//             selectedRider === "All" || item.riderName === selectedRider;
//         const matchesDate = selectedDate
//             ? item.date === selectedDate?.dateString
//             : true;
//         return matchesRider && matchesDate;
//     });

//     // Update the receiver name for a specific row
//     const updateReceiverName = (key, value) => {
//         const updatedData = data.map((item) => {
//             if (item.cnNumber === key) {
//                 return { ...item, receiverName: value };
//             }
//             return item;
//         });
//         setData(updatedData);
//     };

//     // Save all data to local storage
//     const saveAll = () => {
//         localStorage.setItem("courierData", JSON.stringify(data));
//         message.success("All changes saved successfully!");
//     };

//     const handleKeyPress = (index, key, value) => {
//         // Update the receiver name on Enter key press
//         if (key === "Enter") {
//             updateReceiverName(value.cnNumber, value.receiverName);
//             // Focus on the next input
//             const nextInput = inputRefs.current[index + 1];
//             if (nextInput) {
//                 nextInput.focus();
//             }
//         }
//     };

//     const columns = [
//         {
//             title: "#",
//             dataIndex: "key",
//             key: "index",
//             render: (_, __, index) => index + 1, // Display row index
//         },
//         {
//             title: "Rider Name",
//             dataIndex: "riderName",
//             key: "riderName",
//         },
//         {
//             title: "CN Number",
//             dataIndex: "cnNumber",
//             key: "cnNumber",
//         },
//         {
//             title: "Receiver Name",
//             dataIndex: "receiverName",
//             key: "receiverName",
//             render: (_, record, index) => (
//                 <Input
//                     defaultValue={record.receiverName}
//                     ref={(ref) => (inputRefs.current[index] = ref)} // Assign refs for inputs
//                     onChange={(e) =>
//                         updateReceiverName(record.cnNumber, e.target.value)
//                     }
//                     onKeyDown={(e) => handleKeyPress(index, e.key, record)} // Handle Enter key press
//                 />
//             ),
//         },
//         {
//             title: "Consignee Number",
//             dataIndex: "consigneeNumber",
//             key: "consigneeNumber",
//         },
//         {
//             title: "Date",
//             dataIndex: "date",
//             key: "date",
//         },
//     ];

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container>
//                 <Row>
//                     <Col span={24}>
//                         <h1 className="mt-5">Show Data</h1>
//                         <Card>
//                             <Row className="mb-3">
//                                 <Col span={12}>
//                                     <label>Select Rider</label>
//                                     <Select
//                                         className="w-100"
//                                         value={selectedRider}
//                                         onChange={handleRiderChange}
//                                     >
//                                         <Option value="All">All</Option>
//                                         {riders.map((rider, index) => (
//                                             <Option key={index} value={rider.name}>
//                                                 {rider.name}
//                                             </Option>
//                                         ))}
//                                     </Select>
//                                 </Col>
//                                 <Col span={12}>
//                                     <label>Select Date</label>
//                                     <DatePicker
//                                         className="w-100"
//                                         onChange={handleDateChange}
//                                         value={selectedDate?.date}
//                                     />
//                                 </Col>
//                             </Row>
//                             <Button
//                                 type="primary"
//                                 className="mb-3"
//                                 onClick={saveAll}
//                             >
//                                 Save All
//                             </Button>
//                             <Table
//                                 columns={columns}
//                                 dataSource={filteredData}
//                                 rowKey="cnNumber"
//                                 bordered
//                                 pagination={false}
//                                 loading={loading}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;


// import { Table, Card, Select, DatePicker,  Row, Col, Button } from "antd";
// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);
//         const savedRiders = localStorage.getItem("couriers");
//         const savedCouriers = localStorage.getItem("courierData");

//         if (savedRiders) setRiders(JSON.parse(savedRiders));
//         if (savedCouriers) setData(JSON.parse(savedCouriers));
//         setTimeout(() => {(setLoading(false))}, 800);
//     }, []);

//     const handleRiderChange = (value) => setSelectedRider(value);

//     const handleDateChange = (date, dateString) =>
//         setSelectedDate(date ? dateString : null);

//     const filteredData = data.filter((item) => {
//         const matchesRider =
//             selectedRider === "All" || item.riderId === selectedRider;
//         const matchesDate = selectedDate ? item.date === selectedDate : true;
//         return matchesRider && matchesDate;
//     });

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             <Select
//                                 className="w-50 me-2"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All</Option>
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
//                               <Button 
//                                 type="primary"
//                                 className="mb-3"
//                                 // onClick={saveAll}
//                             >
//                                 Save All
//                             </Button>
//                             <Table loading={loading}
//                                 dataSource={filteredData}
//                                 rowKey="cnNumber"
//                                 pagination={false}
//                                 columns={[
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
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) =>
//                                             riders.find((r) => r.id === record.riderId)?.name || "Unknown",
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

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const inputRefs = useRef([]);

//     useEffect(() => {
//         setLoading(true);
//         const savedRiders = localStorage.getItem("couriers");
//         const savedCouriers = localStorage.getItem("courierData");

//         if (savedRiders) setRiders(JSON.parse(savedRiders));
//         if (savedCouriers) setData(JSON.parse(savedCouriers));
//         setTimeout(() => setLoading(false), 800);
//     }, []);

//     const handleRiderChange = (value) => setSelectedRider(value);

//     const handleDateChange = (date, dateString) =>
//         setSelectedDate(date ? dateString : null);

//     const updateReceiverName = (cnNumber, value) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.cnNumber === cnNumber
//                     ? { ...item, receiverName: value }
//                     : item
//             )
//         );
//     };

//     const handleKeyPress = (index, key, record) => {
//         if (key === "Enter") {
//             const nextInput = inputRefs.current[index + 1];
//             if (nextInput) {
//                 nextInput.focus(); // Move focus to the next input
//             } else {
//                 message.success(
//                     `Receiver name updated for CN Number: ${record.cnNumber}`
//                 );
//             }
//         }
//     };

//     const filteredData = data.filter((item) => {
//         const matchesRider =
//             selectedRider === "All" || item.riderId === selectedRider;
//         const matchesDate = selectedDate ? item.date === selectedDate : true;
//         return matchesRider && matchesDate;
//     });

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             <Select
//                                 className="w-50 me-2"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All</Option>
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
//                                 onClick={() => message.success("All data saved!")}
//                             >
//                                 Save All
//                             </Button>
//                             <Table
//                                 loading={loading}
//                                 dataSource={filteredData}
//                                 rowKey="cnNumber"
//                                 pagination={false}
//                                 columns={[
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
//                                                 ref={(ref) => (inputRefs.current[index] = ref)} // Assign refs for inputs
//                                                 onChange={(e) =>
//                                                     updateReceiverName(
//                                                         record.cnNumber,
//                                                         e.target.value
//                                                     )
//                                                 }
//                                                 onKeyDown={(e) =>
//                                                     handleKeyPress(
//                                                         index,
//                                                         e.key,
//                                                         record
//                                                     )
//                                                 } // Handle Enter key press
//                                             />
//                                         ),
//                                     },
//                                     {
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) =>
//                                             riders.find((r) => r.id === record.riderId)?.name ||
//                                             "Unknown",
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

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     // const [riders, setRiders] = useState([]);
//     const [riders, setRiders] = useState(JSON.parse(localStorage.getItem('riders')) || []);
//     const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem('deliveries')) || []);
//     const [delivery, setDelivery] = useState({ riderIndex: '', date: '', cnNumber: '', consigneeName: '' });
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const inputRefs = useRef([]);
//     useEffect(() => {
//         setLoading(true);
    
//         // Load deliveries, riders, or couriers from localStorage
//         const savedRiders = localStorage.getItem('riders');
//         const savedDeliveries = localStorage.getItem('deliveries');
    
//         if (savedRiders) setRiders(JSON.parse(savedRiders)); // Initialize riders
//         if (savedDeliveries) setData(JSON.parse(savedDeliveries)); // Initialize deliveries
    
//         setTimeout(() => setLoading(false), 800); // Simulate a delay to show loading state
//     }, []);
    
//     const handleDeliveryChange = (e, name = null) => {
//         if (name) {
//             // For Select component (e.g., Rider dropdown)
//             setDelivery(prev => ({ ...prev, [name]: e }));
//         } else {
//             const { name, value } = e.target; // For Input components
//             setDelivery(prev => ({ ...prev, [name]: value }));
//         }
//     };
    

//     const handleRiderChange = (value) => setSelectedRider(value);

//     const handleDateChange = (date, dateString) =>
//         setSelectedDate(date ? dateString : null);

//     const updateReceiverName = (cnNumber, value) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.cnNumber === cnNumber
//                     ? { ...item, receiverName: value }
//                     : item
//             )
//         );
//     };

//     const handleSave = () => {
//         const filteredData = data.filter((item) => {
//             const matchesRider =
//                 selectedRider === "All" || item.riderId === selectedRider;
//             const matchesDate = selectedDate ? item.date === selectedDate : true;
//             return matchesRider && matchesDate;
//         });
//         localStorage.setItem("riderData", JSON.stringify(filteredData));
//         message.success("Data saved successfully!");
//     };

//     return (
//         <main className="d-flex justify-content-center align-items-center">
//             <Container className="m">
//                 <Row>
//                     <Col span={24}>
//                         <h1>Show Data</h1>
//                         <Card>
//                             {/* <Select
//                                 className="w-50 me-2"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All</Option>
//                                 {riders.map((rider) => (
//                                     <Option key={rider.id} value={rider.id}>
//                                         {rider.name}
//                                     </Option>
//                                 ))}
//                             </Select> */}
//                             <Select
//                                 name="riderIndex"
//                                 className="my-2 w-100"
//                                 value={delivery.riderIndex}
//                                 onChange={(value) => handleDeliveryChange(value, "riderIndex")}
//                             >
//                                 <option value="" disabled>Select a rider</option>
//                                 {riders.map((rider, index) => (
//                                     <option key={index} value={index}>{rider.name}</option>
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
//                                 Save All
//                             </Button>
//                             <Table
//                                 loading={loading}
//                                 dataSource={data}
//                                 rowKey="cnNumber"
//                                 pagination={false}
//                                 columns={[
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
//                                                 (inputRefs.current[index] =
//                                                     ref)
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
//                                         title: "Rider Name",
//                                         key: "riderName",
//                                         render: (record) =>
//                                             riders.find(
//                                                 (r) => r.id === record.riderId
//                                             )?.name || "Unknown",
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

const { Option } = Select;

const ShowData = () => {
    const [data, setData] = useState([]);
    const [riders, setRiders] = useState(JSON.parse(localStorage.getItem("riders")) || []);
    const [deliveries, setDeliveries] = useState(JSON.parse(localStorage.getItem("deliveries")) || []);
    const [delivery, setDelivery] = useState({ ridername: "", date: "", cnNumber: "", consigneeName: "" });
    const [selectedRider, setSelectedRider] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputRefs = useRef([]);

    useEffect(() => {
        setLoading(true);

        const savedRiders = localStorage.getItem("riders");
        const savedDeliveries = localStorage.getItem("deliveries");

        if (savedRiders) setRiders(JSON.parse(savedRiders));
        if (savedDeliveries) setData(JSON.parse(savedDeliveries));

        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleDeliveryChange = (e, name = null) => {
        if (name) {
            setDelivery((prev) => ({ ...prev, [name]: e }));
        } else {
            const { name, value } = e.target;
            setDelivery((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRiderChange = (value) => setSelectedRider(value);

    const handleDateChange = (date, dateString) =>
        setSelectedDate(date ? dateString : null);

    const updateReceiverName = (cnNumber, value) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.cnNumber === cnNumber
                    ? { ...item, receiverName: value }
                    : item
            )
        );
    };

    const handleSave = () => {
        const filteredData = data.filter((item) => {
            const matchesRider =
                selectedRider === "All" || item.riderId === selectedRider;
            const matchesDate = selectedDate ? item.date === selectedDate : true;
            return matchesRider && matchesDate;
        });
        localStorage.setItem("riderData", JSON.stringify(filteredData));
        message.success("Data saved successfully!");
    };

    return (
        <main className="d-flex justify-content-center align-items-center">
            <Container className="m">
                <Row>
                    <Col span={24}>
                        <h1>Show Data</h1>
                        <Card>
                            <Select
                                name="riderId"
                                className="my-2 w-100"
                                value={delivery.riderId}
                                onChange={(value) => handleDeliveryChange(value, "riderId")}
                            >
                                <Option value="">Select a rider</Option>
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
                                onClick={handleSave}
                            >
                                Save All
                            </Button>
                            <Table
                                loading={loading}
                                dataSource={data}
                                rowKey="cnNumber"
                                pagination={false}
                                columns={[
                                    {
                                        title: "Rider Name",
                                        key: "riderName",
                                        render: (record) =>
                                            riders.find((r) => r.id === record.ridername)?.name || "Unknown",
                                    },
                                    {
                                        title: "CN Number",
                                        dataIndex: "cnNumber",
                                        key: "cnNumber",
                                        type: "number",
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
                                                    updateReceiverName(
                                                        record.cnNumber,
                                                        e.target.value
                                                    )
                                                }
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


// const columns = [
//     {
//         title: "#",
//         dataIndex: "key",
//         key: "index",
//         render: (_, __, index) => index + 1,
//     filters: data.map((item) => ({
//         text: item.riderName,
//         value: item.riderName,
//     })),
//     onFilter: (value, record) => record.riderName.includes(value),
//     },
//     { title: "Rider Name", dataIndex: "riderName", key: "riderName" },
//     { title: "Receiver Name", dataIndex: "receiverName", key: "receiverName" },
//     { title: "CN Number", dataIndex: "cnNumber", key: "cnNumber" },
//     { title: "Consignee Number", dataIndex: "consigneeNumber", key: "consigneeNumber" },
//     { title: "Date", dataIndex: "date", key: "date" },
// ];