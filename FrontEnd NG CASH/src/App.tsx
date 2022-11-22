import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import {PrivateRoute} from "../src/pages/privateRoute"
import { NotFound } from "./pages/notFound";


function App() {

  return (

      <>
        <Routes>
          <Route path="/" 
            element={
              
            <Login />
              
          } 
          />

          <Route path="/register" 
            element={
              
            <Register />
              
          } 
          />

          <Route path="/home" 
            element={
             <PrivateRoute> 
              <Home/>
            </PrivateRoute>
              
          } 
          />

          <Route path="*" 
            element={
             <PrivateRoute> 
              <NotFound />
            </PrivateRoute>
              
          } 
          />
          
        </Routes>
        <Footer />
      </>
  );
}

export default App;
