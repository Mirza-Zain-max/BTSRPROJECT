import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Index from '../Frontend';
import Rider from '../DashBoard/Rider';
import Header1 from '../../Components/Header/Header';
import ListShipments from '../DashBoard/ListShipments';
import ExcelSheet from '../DashBoard/ExcelSheet';
import RiderList from '../DashBoard/RiderList';
import ViewShipment from '../DashBoard/ViewShipment';
import UpdateShipment from '../DashBoard/UpdateShipment';
import CPage from '../DashBoard/Cpage';
import ShowData from '../DashBoard/ShowData';

const FrontEnd = () => {
  return (
    <>
    <Header1/>
    <Routes>
        {/* <Route path='/*' element={<Index/>}/> */}
        <Route path='/' element={<Rider/>}/>
        <Route path='/viewShipment' element={<ViewShipment/>}/>
        <Route path='/listshipment' element={<ListShipments/>}/>
        <Route path='/veiwrider' element={<ExcelSheet/>}/>
        <Route path='/riderlist' element={<RiderList/>}/>
        <Route path='/upDate' element={<UpdateShipment/>}/>
        <Route path='/cPage' element={<CPage/>}/>
        <Route path='/showData' element={<ShowData/>}/>
    </Routes>
    </>
  )
}

export default FrontEnd;