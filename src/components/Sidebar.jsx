import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6">
      <h1 className="text-2xl font-bold text-emerald-600 mb-10">
        HealthApp
      </h1>

      <nav className="space-y-4">
        <NavLink to="/dashboard" className="block text-gray-700 hover:text-emerald-600">
          Dashboard
        </NavLink>
        <NavLink to="#" className="block text-gray-700 hover:text-emerald-600">
          Fitness
        </NavLink>
        <NavLink to="#" className="block text-gray-700 hover:text-emerald-600">
          Nutrition
        </NavLink>
        <NavLink to="#" className="block text-gray-700 hover:text-emerald-600">
          Goals
        </NavLink>
      </nav>
    </aside>
  );
}
