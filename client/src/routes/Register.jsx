import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Register = () => {
   const { register } = useAuth();
   const [user, setUser] = useState({
      password: "",
      username: "",
   });
   const [error, setError] = useState({ status: false, message: "" });
   const handleChange = (e) => {
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setError({ status: false, message: "" });
   };
   const navigate = useNavigate();
   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         await register(user);
         navigate("/login");
      } catch (error) {
         setError({ status: true, message: error.response.data });
      }
   };
   return (
      <div className="register-container">
         <div className="form-container">
            <form onSubmit={(e) => handleRegister(e)}>
               <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  className={error.status ? "error" : undefined}
                  required
               />
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  className={error.status ? "error" : undefined}
                  required
               />
               {error.status && (
                  <div className="error-msg">{error.message}</div>
               )}
               <input
                  type="submit"
                  value="Register"
                  className={"btn-register"}
               />
            </form>
         </div>
      </div>
   );
};

export default Register;
