import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
const PrivateRoutes = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        let session = localStorage.getItem('accessToken');
        if (!session) {
            navigate('/login');
        } else {
            navigate('/dashboard')
        }
    },[]);
    return (
        <Routes>
            <Route path={props.path} element={<props.component />} />;
        </Routes>
    )
};
export default PrivateRoutes;


