import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Header = () => {
   const { logout, user } = useAuth();
   return (
      <div className="header">
         {!user && (
            <div>
               <Link
                  to="/login"
                  className="link-header"
                  style={{ marginRight: "1rem" }}
               >
                  Login
               </Link>
               <Link to="/register" className="link-header">
                  Register
               </Link>
            </div>
         )}
         {user && (
            <>
               <div className="hi">
                  Hello{" "}
                  <span>{localStorage.getItem("user")?.toLowerCase()}</span>
               </div>
               <Link to="/" onClick={logout} className="link-header">
                  Logout
               </Link>
            </>
         )}
      </div>
   );
};

export default Header;
