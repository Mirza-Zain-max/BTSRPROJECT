// import { Container, Dropdown, Navbar, NavDropdown } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../Context/Auth';
// import { useState } from 'react';
// import { Input, message, Modal } from 'antd';
// import { doc, getDoc } from 'firebase/firestore';
// import { fireStore } from '../../Config/firebase';

// function Header1() {
//   const { isAuth, handleLogout } = useAuthContext()
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [password, setPassword] = useState('');


//   const isAuthorized = localStorage.getItem('isAuthorized') === 'true';

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   // const handleOk = () => {
//   //   if (password === 'naveed9562') {
//   //     setIsAuthorized(true);
//   //     navigate('/booking');
//   //   } else {
//   //     alert('Incorrect password!');
//   //   }
//   //   setIsModalOpen(false);
//   //   setPassword('');
//   // };
//   // const handleCancel = () => {
//   //   setIsModalOpen(false);
//   //   setPassword('');
//   // };
//   const handleOk = async () => {
//     try {
//       const docRef = doc(fireStore, 'secureData', 'password'); // Ensure this document exists
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists() && password === docSnap.data().value) {
//         localStorage.setItem('isAuthorized', 'true');
//         navigate('/booking');
//       } else {
//         alert('Incorrect password!');
//       }
//     } catch (error) {
//       console.error('Error verifying password:', error);
//       alert('Error checking password. Try again!');
//     }

//     setIsModalOpen(false);
//     setPassword('');
//   };
//    const handleCancel = () => {
//     setIsModalOpen(false);
//     setPassword('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleOk();
//     }
//   };

//   return (
//     <Navbar className=" p-4">
//       <Container>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Link className=' nav-link mx-3 fw-bold ' to="/add">Add Rider</Link>
//           <Link className=' nav-link mx-3 fw-bold ' to="/boking">Boking</Link>
//           <NavDropdown title="Delivery" className='fw-bold  mx-3' id="basic-nav-dropdown">
//             <Link className=' nav-link  text-center fw-bold  my-2 p-1 ' to="/make-delivery"> Make Sheet</Link>
//             <hr />
//             <Link className=' nav-link  text-center fw-bold my-2 p-1 ' to="/view-sheet">View Sheet</Link>
//             <hr />
//             <Link className=' nav-link  text-center fw-bold my-2 p-1 ' to='/showData'>Update Sheet</Link>
//           </NavDropdown>
//           <Link className=' nav-link mx-3 fw-bold ' to="/track-shipment">Track Shipment</Link>
//           <NavDropdown title="Account" className='fw-bold   ms-3 flex-wrap ' id="basic-nav-dropdown">
//             {!isAuth
//               ? <>
//                 <Dropdown.Item as={"div"}>
//                   <Link className='ms-4 nav-link  fw-bold' to="/auth/login">Login</Link>
//                 </Dropdown.Item>
//                 <Dropdown.Item as={"div"}>
//                   <Link className='ms-4 nav-link   fw-bold' to="/auth/register">Register</Link>
//                 </Dropdown.Item>
//               </>
//               : <>
//                 <Dropdown.Item as={"div"}>
//                   <span className=' nav-link  text-center  fw-bold p-1' to="/booking" onClick={showModal}>Data Deleted</span>
//                 </Dropdown.Item>
//                 <hr />
//                 <Dropdown.Item as={"div"}>
//                   <Link className=' nav-link  text-center  fw-bold p-1' onClick={handleLogout} >Logout</Link>
//                 </Dropdown.Item>
//                 <Modal title="Enter Password" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//                   <Input.Password
//                   value={password} 
//                   onChange={(e) => setPassword(e.target.value)} 
//                   onKeyPress={handleKeyPress} 
//                   placeholder="Enter your password" 
//                   />
//                 </Modal>
//               </>
//             }
//           </NavDropdown>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header1;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Input } from 'antd';
import { useAuthContext } from '../../Context/Auth';
import { fireStore } from '../../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Header1 = () => {
  const { isAuth, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleOk = async () => {
    try {
      const docRef = doc(fireStore, 'secureData', 'password');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && password === docSnap.data().value) {
        localStorage.setItem('isAuthorized', 'true');
        navigate('/booking');
      } else {
        alert('Incorrect password!');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      alert('Error checking password. Try again!');
    }

    setIsModalOpen(false);
    setPassword('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleOk();
  };

  useEffect(() => {
    // Close sidebar if clicked outside of it
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sidebar') && !event.target.closest('.toggle-btn')) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <nav className="sidebar-content">
          <Link to="/add" onClick={closeSidebar}>Add Rider</Link>
          <Link to="/boking" onClick={closeSidebar}>Booking</Link>

          {/* Delivery Dropdown */}
          <div className="sidebar-dropdown">
            <span onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}>
              Delivery {isDeliveryOpen ? '▲' : '▼'}
            </span>
            {isDeliveryOpen && (
              <div className="sidebar-submenu">
                <Link to="/make-delivery" onClick={closeSidebar}>Make Sheet</Link>
                <Link to="/view-sheet" onClick={closeSidebar}>View Sheet</Link>
                <Link to="/showData" onClick={closeSidebar}>Update Sheet</Link>
              </div>
            )}
          </div>

          <Link to="/track-shipment" onClick={closeSidebar}>Track Shipment</Link>

          {/* Account Dropdown */}
          <div className="sidebar-dropdown">
            <span onClick={() => setIsAccountOpen(!isAccountOpen)}>
              Account {isAccountOpen ? '▲' : '▼'}
            </span>
            {isAccountOpen && (
              <div className="sidebar-submenu">
                {!isAuth ? (
                  <>
                    <Link to="/auth/login" onClick={closeSidebar}>Login</Link>
                    <Link to="/auth/register" onClick={closeSidebar}>Register</Link>
                  </>
                ) : (
                  <>
                    <span onClick={() => { setIsModalOpen(true); closeSidebar(); }}>Data Deleted</span>
                    <Link onClick={() => { handleLogout(); closeSidebar(); }}>Logout</Link>

                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      <Modal title="Enter Password" centered open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your password"
        />
      </Modal>
    </>
  );
};

export default Header1;
