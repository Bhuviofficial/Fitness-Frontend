import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import Goals from "./pages/Goals";
import Exercise from "./pages/Exercise";
import DashboardLayout from "./layouts/Layout";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  return token ? <DashboardLayout /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/exercise" element={<Exercise />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
