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
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Main App</h1>
      <Dashboard />

      {/* Enhanced Button */}
      <Link to="/timetable">
        <button className="mt-6 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
          <Calendar className="w-5 h-5" />
          View Timetable
        </button>
      </Link>
    </div>
  );
}

export default App;
