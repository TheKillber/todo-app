import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { HashLoader } from "react-spinners";

const PrivateRoutes = ({ children }) => {
   const { user, loading } = useAuth();

   if (loading) {
      return (
         <div className="loader-container">
            <HashLoader color="#f6f6f6" size={70} />
         </div>
      );
   }
   return !loading && user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
