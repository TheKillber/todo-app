import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Header from "./components/Header";
import Notes from "./routes/Notes";
import Footer from "./components/Footer";
import PrivateRoutes from "./components/PrivateRoutes";
import Register from "./routes/Register";

function App() {
   return (
      <div className="bg">
         <Header />

         <div className="container">
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />

               <Route
                  path="/"
                  element={
                     <PrivateRoutes>
                        <Notes />
                     </PrivateRoutes>
                  }
               />
            </Routes>
         </div>

         <Footer />
      </div>
   );
}

export default App;
