import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
export default function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signIn" element={authUser ? <Navigate to="/" /> : <Signin />} />
      </Routes>
    </div>
  )
}