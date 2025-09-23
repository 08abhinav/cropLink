import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import UrlCreation from "./pages/UrlCreation";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import ProtectedRoute from "./lib/ProtectedRoute";
import CustomUrlPage from "./pages/CustomUrl";

const App = () => {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard"/>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashBoard /> 
          </ProtectedRoute>}
        />
        <Route path="/urlCreation" 
        element={
          <ProtectedRoute>
            <UrlCreation />
          </ProtectedRoute>
        } />

        <Route path="/customCreation" 
        element={
          <ProtectedRoute>
            <CustomUrlPage/>
          </ProtectedRoute>
        } />
      </Routes>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default App;
