import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Nutrition from "./components/Nutrition.jsx";
import Goals from "./components/Goals.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const Protected = ({ children }) => {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ FIX: ROOT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<Protected><Dashboard /></Protected>}
        />
        <Route
          path="/nutrition"
          element={<Protected><Nutrition /></Protected>}
        />
        <Route
          path="/goals"
          element={<Protected><Goals /></Protected>}
        />

        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
