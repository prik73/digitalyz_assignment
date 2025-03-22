import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Calendar } from "lucide-react"; // Import an icon
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timetable" element={<Timetable />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage() {
  return (
    <div className="w-full max-w-4xl p-6">
      {/* Top Section with Button on Right */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">cleaned final json file from dataset.xlsx</h1>

        <Link to="/timetable">
  <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200">
    <Calendar className="w-5 h-5 text-gray-500" />
    View Timetable
  </button>
</Link>
      </div>

      <Dashboard />
    </div>
  );
}

export default App;
