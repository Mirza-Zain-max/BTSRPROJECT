// import { Table, Card } from "antd";
// import React, { useState, useEffect } from "react";
// import { Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const naigate = useNavigate()
//     useEffect(() => {
//         const riderData = JSON.parse(localStorage.getItem("riderData") || "[]");
//         const courierData = JSON.parse(localStorage.getItem("courierData") || "[]");

//         // Combine riderData and courierData
//         const combinedData = courierData.map((courier, index) => {
//             const rider = riderData.find((r) => r.riderName === courier.riderName);
//             return {
//                 key: index + 1, // Add a unique key for each row
//                 ...courier,
//                 receiverName: rider ? rider.receiverName : "N/A",
//             };
//         });

//         setData(combinedData);
//     }, []);

//     const columns = [
//         {
//             title: "#",
//             dataIndex: "key",
//             key: "index",
//             render: (_, __, index) => index + 1, // Render row index
//         },
//         { title: "Rider Name", dataIndex: "riderName", key: "riderName" },
//         { title: "Receiver Name", dataIndex: "receiverName", key: "receiverName" },
//         { title: "CN Number", dataIndex: "cnNumber", key: "cnNumber" },
//         { title: "Consignee Number", dataIndex: "consigneeNumber", key: "consigneeNumber" },
//         { title: "Date", dataIndex: "date", key: "date" },
//     ];

//     return (
//         <main className="d-flex justify-content-center align-items-center mt-5" style={{ height: "100vh" }}>
//             <Container>
//                     <h1 className="my-5">Show Data</h1>
//                 <Card className="w-100">
//                     <Button variant="primary" onClick={() => { naigate('/cPage') }} >
//                         Print
//                     </Button>
//                     <Table  columns={columns} bordered dataSource={data} rowKey="cnNumber" />
//                 </Card>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;



// import { Table, Card, Select, DatePicker, Row, Col } from "antd";
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import { Container } from "react-bootstrap";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);

//     useEffect(() => {
//         const savedRiders = localStorage.getItem("riderData");
//         const savedCouriers = localStorage.getItem("courierData");

//         if (savedRiders) {
//             setRiders(JSON.parse(savedRiders));
//         }
//         if (savedCouriers) {
//             setData(JSON.parse(savedCouriers));
//         }
//     }, []);

//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//     };

//     const handleDateChange = (date) => {
//         setSelectedDate(date ? moment(date).format("YYYY-MM-DD") : null);
//     };

//     // Filter data based on selected rider and date
//     const filteredData = data.filter((item) => {
//         const matchesRider = selectedRider === "All" || item.riderName === selectedRider;
//         const matchesDate = !selectedDate || item.date === selectedDate;
//         return matchesRider && matchesDate;
//     });

//     const columns = [
//         {
//             title: "#",
//             dataIndex: "key",
//             key: "index",
//             render: (_, __, index) => index + 1, // Row index
//         },
//         {
//             title: "Rider Name & CN Number",
//             key: "riderAndCn",
//             render: (text, record) => (
//                 <div>
//                     {record.riderName} <br />
//                     {record.cnNumber}
//                 </div>
//             ),
//         },
//         { title: "Receiver Name", dataIndex: "receiverName", key: "receiverName" },
//         { title: "Consignee Number", dataIndex: "consigneeNumber", key: "consigneeNumber" },
//         { title: "Date", dataIndex: "date", key: "date" },
//     ];

//     return (
//         <main className="d-flex justify-content-center align-items-center " >
//             <Container>
//                 <Row>
//                     <Col span={24} >
//                         <h1>Show Data</h1>
//                         <Card>
//                             <label>Select Rider</label>
//                             <Select
//                                 className="w-100 "
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All</Option>
//                                 {riders.map((rider, index) => (
//                                     <Option key={index} value={rider.riderName}>
//                                         {rider.riderName}
//                                     </Option>
//                                 ))}
//                             </Select>
//                             <label>Select Date</label>
//                             <DatePicker
//                                 className="w-100 my-2"
//                                 onChange={handleDateChange}
//                                 value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null}
//                             />
//                             <Table columns={columns} pagination={false}  dataSource={filteredData} rowKey="cnNumber" bordered />
//                         </Card>

//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;



// import { Table, Card, Select, DatePicker, Row, Col } from "antd";
// import React, { useState, useEffect } from "react";
// // import moment from "moment";
// import { Container } from "react-bootstrap";

// const { Option } = Select;

// const ShowData = () => {
//     const [data, setData] = useState([]);
//     const [riders, setRiders] = useState([]);
//     const [selectedRider, setSelectedRider] = useState("All");
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state

//     useEffect(() => {
//         // Simulate a data fetch with a timeout
//         const fetchData = () => {
//             setLoading(true);
//             const savedRiders = localStorage.getItem("riderData");
//             const savedCouriers = localStorage.getItem("courierData");

//             if (savedRiders) {
//                 setRiders(JSON.parse(savedRiders));
//             }
//             if (savedCouriers) {
//                 setData(JSON.parse(savedCouriers));
//             }

//             setTimeout(() => {
//                 setLoading(false);
//             }, 800) // End loading after fetching data
//         };

//         fetchData();
//     }, []);

//     const handleRiderChange = (value) => {
//         setSelectedRider(value);
//     };

//     const handleDateChange = (date, dateString) => {
//         setSelectedDate({ date, dateString });
//     };

//     // Filter data based on selected rider and date
//     const filteredData = data.filter((item) => {
//         const matchesRider = selectedRider === "All" || item.riderName === selectedRider;
//         const matchesDate = selectedDate ? item.date === selectedDate?.dateString : true;
//         return matchesRider && matchesDate;
//     });
//     // const columns = [
//     //     {
//     //         title: "#",
//     //         dataIndex: "key",
//     //         key: "index",
//     //         render: (_, __, index) => index + 1, // Row index
//     //     },
//     //     {
//     //         title: "Rider Name & CN Number",
//     //         key: "riderAndCn",
//     //         render: (text, record) => (
//     //             <div>
//     //                 {record.riderName} <br />
//     //                 {record.cnNumber}
//     //             </div>
//     //         ),
//     //     },
//     //     { title: "Receiver Name", dataIndex: "receiverName", key: "receiverName" },
//     //     { title: "Consignee Number", dataIndex: "consigneeNumber", key: "consigneeNumber" },
//     //     { title: "Date", dataIndex: "date", key: "date" },
//     // ];
//     const columns = [
//         {
//             title: "#",
//             dataIndex: "key",
//             key: "index",
//             render: (_, __, index) => index + 1, // Row index
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
//                             <label>Select Rider</label>
//                             <Select
//                                 className="w-100"
//                                 value={selectedRider}
//                                 onChange={handleRiderChange}
//                             >
//                                 <Option value="All">All</Option>
//                                 {riders.map((rider, index) => (
//                                     <Option key={index} value={rider.riderName}>
//                                         {rider.riderName}
//                                     </Option>
//                                 ))}
//                             </Select>
//                             <label>Select Date</label>
//                             <DatePicker
//                                 className="w-100 my-2"
//                                 onChange={handleDateChange}
//                                 value={selectedDate?.date}
//                             />
//                             {/* <Table
//                                 columns={columns}
//                                 dataSource={filteredData}
//                                 rowKey="cnNumber"
//                                 bordered
//                                 pagination={false}
//                                 loading={loading} // Loading prop
//                             /> */}
//                             <Table
//                                 columns={columns}
//                                 dataSource={filteredData}
//                                 rowKey="cnNumber"
//                                 bordered
//                                 pagination={false}
//                                 loading={loading} // Loading prop
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </main>
//     );
// };

// export default ShowData;


import { Table, Card, Select, DatePicker, Row, Col, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const { Option } = Select;

const ShowData = () => {
    const [data, setData] = useState([]);
    const [riders, setRiders] = useState([]);
    const [selectedRider, setSelectedRider] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingKey, setEditingKey] = useState(""); // Track editing row
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            const savedRiders = localStorage.getItem("riderData");
            const savedCouriers = localStorage.getItem("courierData");

            if (savedRiders) {
                setRiders(JSON.parse(savedRiders));
            }
            if (savedCouriers) {
                setData(JSON.parse(savedCouriers));
            }

            setTimeout(() => {
                setLoading(false);
            }, 800); // End loading after fetching data
        };

        fetchData();
    }, []);

    const handleRiderChange = (value) => {
        setSelectedRider(value);
    };

    const handleDateChange = (date, dateString) => {
        setSelectedDate({ date, dateString });
    };

    // Handle row editing
    const isEditing = (record) => record.cnNumber === editingKey;

    const edit = (record) => {
        setEditingKey(record.cnNumber);
    };

    const save = (key, updatedValue) => {
        const updatedData = data.map((item) => {
            if (item.cnNumber === key) {
                return { ...item, receiverName: updatedValue };
            }
            return item;
        });
        setData(updatedData);
        localStorage.setItem("courierData", JSON.stringify(updatedData)); // Save to local storage
        setEditingKey(""); // Clear editing state after saving
    };

    const cancel = () => {
        setEditingKey(""); // Cancel editing and reset the key
    };

    const filteredData = data.filter((item) => {
        const matchesRider = selectedRider === "All" || item.riderName === selectedRider;
        const matchesDate = selectedDate ? item.date === selectedDate?.dateString : true;
        return matchesRider && matchesDate;
    });

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "index",
            render: (_, __, index) => index + 1, // Row index
        },
        {
            title: "Rider Name",
            dataIndex: "riderName",
            key: "riderName",
        },
        {
            title: "CN Number",
            dataIndex: "cnNumber",
            key: "cnNumber",
        },
        {
            title: "Receiver Name",
            dataIndex: "receiverName",
            key: "receiverName",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Input
                        defaultValue={record.receiverName}
                        onPressEnter={(e) => save(record.cnNumber, e.target.value)}
                        onBlur={(e) => save(record.cnNumber, e.target.value)} // Save on blur
                    />
                ) : (
                        <Input onClick={()=>edit(record)}  placeholder="Reciver Name"/>
                    // <>
                    //     {record.receiverName}{" "}
                    //     {/* The Edit button only shows if the row is not being edited */}
                    //      {editingKey !== record.cnNumber && ( 
                    //          <Button
                    //              type="link"
                    //              onClick={() => edit(record)}
                    //              disabled={editingKey !== ""}
                    //          >
                    //              Edit
                    //          </Button>
                            

                            
                    //      )}
                    // </>
                );
            },
        },
        {
            title: "Consignee Number",
            dataIndex: "consigneeNumber",
            key: "consigneeNumber",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    return (
        <main className="d-flex justify-content-center align-items-center">
            <Container>
                <Row>
                    <Col span={24}>
                        <h1 className="mt-5">Show Data</h1>
                        <Card>
                            <label>Select Rider</label>
                            <Select
                                className="w-100"
                                value={selectedRider}
                                onChange={handleRiderChange}
                            >
                                <Option value="All">All</Option>
                                {riders.map((rider, index) => (
                                    <Option key={index} value={rider.riderName}>
                                        {rider.riderName}
                                    </Option>
                                ))}
                            </Select>
                            <label>Select Date</label>
                            <DatePicker
                                className="w-100 my-2"
                                onChange={handleDateChange}
                                value={selectedDate?.date}
                            />
                            <Table
                                columns={columns}
                                dataSource={filteredData}
                                rowKey="cnNumber"
                                bordered
                                pagination={false}
                                loading={loading} // Loading prop
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