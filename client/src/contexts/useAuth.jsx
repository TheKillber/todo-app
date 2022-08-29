import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { api } from "../utils/api";

const baseUrl = process.env.REACT_APP_SERVER_URL;

const authContext = createContext();

export const AuthProvider = ({ children }) => {
   const auth = useAuthProvider();

   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
export const useAuth = () => {
   return useContext(authContext);
};
const useAuthProvider = () => {
   const [user, setUser] = useState(null);
   const [isChecked, setIsChecked] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      checkAuth()
         .then((res) => {
            setUser(res);
         })
         .then(() => setLoading(false));
   }, [isChecked]);

   const checkAuth = async () => {
      setUser(null);
      setLoading(true);
      if (!localStorage.getItem("token") || user !== null) {
         return;
      }
      try {
         setIsChecked(true);
         return await api.get("/api/user");
      } catch (error) {
         return error.response;
      }
   };

   const login = async (userData) => {
      try {
         const res = await axios.post(`${baseUrl}/api/auth/login`, userData, {
            withCredentials: true,
         });

         setUser(res.data.token);
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("user", res.data.user);
      } catch (error) {
         return error.response;
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
      return;
   };

   const register = async (userData) => {
      try {
         return axios.post(`${baseUrl}/api/auth/register`, userData, {
            withCredentials: true,
         });
      } catch (error) {
         return error.response;
      }
   };

   return {
      logout,
      user,
      loading,
      login,
      register,
   };
};
