import React from 'react'
import AddShipment from './AddShipment'
import Cpage from './Cpage'
import ExcelSheet from './ExcelSheet'
import ListShipments from './ListShipments'
import Rider from './Rider'
import RiderList from './RiderList'
import UpdateShipment from './UpdateShipment'
import ViewShipment from './ViewShipment'

const Dashboard = () => {
    return (
        <main>
            <AddShipment />
            <Cpage />
            <ExcelSheet />
            <ListShipments />
            <Rider />
            <RiderList />
            <UpdateShipment />
            <ViewShipment />
        </main>
    )
}

export default Dashboard;