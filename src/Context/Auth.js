import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { auth, fireStore } from 'Components/Config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { message } from 'antd';
import Screenloader from '../FrontEnd/Screenloader';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({
    isAuth: false, user: {},
    isAppLoading: true,
    dispatch: () => { },
    handleLogout: () => {
        message.success('Logout failed');
    },
});

const initialState = { isAuth: false, user: {} };

const AuthProvider = ({ children }) => {

    // const userId = localStorage.getItem('user-uid');
    const [state, dispatch] = useState(initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);

    const readProfile = useCallback(async (user) => {

        const docSnap = await getDoc(doc(fireStore, "users", user.uid));

        if (docSnap.exists()) {
            const user = docSnap.data()
            console.log(' firestore user', user)
            dispatch(s => ({ ...s, isAuth: true, user }));

        } else {
            // docSnap.data() will be undefined in this case
        }
        setIsAppLoading(false);
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user data', user)
                // dispatch(s => ({ ...s, isAuth: true, user }));
                readProfile(user);
                // console.log('User logged in:', user);
            } else {
                // dispatch(s => ({ ...s, isAuth: false, user: {} }));
                setIsAppLoading(false);
            }
        });
    }, [readProfile]);
    const handleLogout = () => {
        dispatch({ isAuth: false, user: {} });
        signOut(auth)
            .then(() => {
                message.success('Logout successful');
                localStorage.removeItem('user-login');
                localStorage.removeItem('user-uid');
            })
            .catch(() => {
                message.error('Something went wrong while logging out');
            });
    };

    return (
        <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
            {isAppLoading ? <Screenloader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
