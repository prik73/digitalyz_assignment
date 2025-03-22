import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Calendar } from "lucide-react"; // Import an icon
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
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
    <div className="w-4/5 mx-auto p-8 bg-white rounded-xl shadow-md">
      {/* Top Section with Button on Right */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">cleaned final json file from dataset.xlsx</h1>
        
        <Link to="/timetable">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <Calendar className="w-5 h-5" />
            <span>View Timetable</span>
          </button>
        </Link>
      </div>
      
      {/* Card Container */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;