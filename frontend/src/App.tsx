import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import DashBoard from './pages/DashBoard';
import ProtectRoute from './lib/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <DashBoard />
            </ProtectRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default App;
