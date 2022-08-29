import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";

const Login = () => {
   const { login, user, loading } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (user) {
         navigate("/");
      }
   }, [user]);

   const [newUser, setNewUser] = useState({
      username: "",
      password: "",
   });
   const [error, setError] = useState({ status: false, message: "" });

   const handleChange = (e) => {
      setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setError({ status: false, message: "" });
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         await login(newUser);
      } catch (error) {
         setError({ status: true, message: error.data });
      }
   };

   if (loading)
      return (
         <div className="loader-container">
            <HashLoader color="#f6f6f6" size={70} />
         </div>
      );

   return (
      <section id="login">
         <div className="text">
            <div className="title">Have an idea?</div>
            <div className="subtitle">Save it!</div>
         </div>
         <div className="login-container">
            {error.status && <div className="error-msg">{error.message}</div>}
            <form onSubmit={(e) => handleLogin(e)}>
               <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  className={error.status ? "error" : undefined}
               />
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  autoComplete="on"
                  className={error.status ? "error" : undefined}
               />
               <input type="submit" value="Login" className="btn-login" />
            </form>
            <hr />
            <Link to="/register">
               <button className="btn-register">SING UP</button>
            </Link>
         </div>
      </section>
   );
};

export default Login;
