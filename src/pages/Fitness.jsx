import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Fitness() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Fitness Tracking</h2>
        </div>
      </div>
    </div>
  )
}
