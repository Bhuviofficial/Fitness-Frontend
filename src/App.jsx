import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import Goals from "./pages/Goals";

<Routes>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/nutrition" element={<Nutrition />} />
    <Route path="/goals" element={<Goals />} />
  </Route>
</Routes>;
export default App;