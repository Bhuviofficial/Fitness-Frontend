import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CaloriesChart from "../components/CaloriesChart";
import MacroChart from "../components/MacroChart";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 space-y-8">
          <h1 className="text-2xl font-bold">
            Wellness Overview
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-sm text-gray-500">Calories Burned</h3>
              <p className="text-3xl font-bold">520</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-sm text-gray-500">Steps</h3>
              <p className="text-3xl font-bold">8,430</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-sm text-gray-500">Workout Time</h3>
              <p className="text-3xl font-bold">45 min</p>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Weekly Calories
              </h2>
              <CaloriesChart />
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Nutrition Breakdown
              </h2>
              <MacroChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
