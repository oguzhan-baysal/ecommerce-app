import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css';

import ProtectedRoute from "./pages/ProtectedRoute";
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from './pages/Admin'
import Footer from "./components/Footer";


function App() {
  return (
    <Router>

      <div>
        <Navbar />
      </div>


      <div className="content">
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='*' element={<Products />} />
          <Route path='/product/:product_id' element={<ProductDetail />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/basket' element={<Basket />} />
          <Route element={<Error404 />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/*" admin={true} element={<ProtectedRoute><Admin /></ProtectedRoute>} />

        </Routes>
      </div>


      <Footer />

    </Router>
  );
}
export default App;
