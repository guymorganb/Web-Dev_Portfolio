import { Navigate, Outlet } from "react-router-dom";
import authCheck from "../../utils/authCheck";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import React, {useState, useEffect} from "react";

export default function ProtectedRoutes({ element }) {
    const { data, loading, error } = useQuery(GET_ME);
    
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        if (loading) return;
        const auth = authCheck(data, loading, error);
        console.log(auth, "auth")
        setIsAuthenticated(auth);
    }, [data, loading, error]);

    if (loading|| isAuthenticated === null) {
      return <div>Loading...</div>; 
    }
    console.log(isAuthenticated, "isAuthenticated");
    if (isAuthenticated) {
        return element; // this will render the provided element (like Services or Appointments)
    } 
    return <Navigate to="/" />;
}





