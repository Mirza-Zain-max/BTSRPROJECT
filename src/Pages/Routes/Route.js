import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Index from '../Frontend';
import AddRider from '../DashBoard/AddRider';
import Header1 from '../../Components/Header/Header';
// import ListShipments from '../DashBoard/ListShipments';
// import UpdateShipment from '../DashBoard/UpdateShipment';
// import CPage from '../DashBoard/Cpage';
// import ShowData from '../DashBoard/ShowData';
// import RunSheet from '../DashBoard/RunSheet';
import ViewSheet from '../DashBoard/ViewSheet';
import RunSheet from '../DashBoard/RunSheet';
import TrackShipment from '../DashBoard/Tracking';
import Download from '../DashBoard/Download';
import ShowData from '../DashBoard/ShowData';
// import Tracking from '../DashBoard/Tracking';

const FrontEnd = () => {
  return (
    <>
    <Header1/>
    {/* <Routes>
        <Route path='/*' element={<Index/>}/> 
        <Route path='/' element={<AddRider/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
        <Route path='/listshipment' element={<ListShipments/>}/>
        <Route path='/adds' element={<ListShipments/>}/>
        <Route path='/runSheet' element={<RunSheet/>}/>
        <Route path='/viewSheet' element={<ViewSheet/>}/>
        <Route path='/upDate' element={<UpdateShipment/>}/>
        <Route path='/cPage' element={<CPage/>}/>
        </Routes> */}
     <Routes>
        <Route path='/showData' element={<ShowData/>}/>
          <Route path="/" element={<AddRider />} />
          <Route path="/make-delivery" element={<RunSheet />} />
          <Route path="/track-shipment" element={<TrackShipment />} />
          <Route path="/view-sheet" element={<ViewSheet />} />
          <Route path="/download-upload" element={<Download />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    </>
  )
}

export default FrontEnd;