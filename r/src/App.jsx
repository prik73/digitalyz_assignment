import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Calendar, FileText, FileJson } from "lucide-react"; // Import icons
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";
import { Analytics } from "@vercel/analytics/react"

function App() {
  <Analytics/>
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Cleaned final JSON file from dataset.xlsx
        </h1>
        
        <Link to="/timetable" className="relative group">
          <div className="absolute -inset-0.5 bg-gray-800 opacity-20 rounded-md translate-y-1 translate-x-1 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"></div>
          <button className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gradient-to-b from-blue-50 to-blue-100 rounded-md border-b-2 border-blue-300 group-hover:from-blue-100 group-hover:to-blue-200 group-active:translate-y-0.5 group-active:border-b group-active:border-b-blue-200 transition-all duration-150">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>View Timetable</span>
          </button>
        </Link>
      </div>
      
      {/* Buttons for JSON & README */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* View JSON Button */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gray-800 opacity-20 rounded-md translate-y-1 translate-x-1 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"></div>
          <a 
            href="/output3.json"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gradient-to-b from-purple-50 to-purple-100 rounded-md border-b-2 border-purple-300 group-hover:from-purple-100 group-hover:to-purple-200 group-active:translate-y-0.5 group-active:border-b group-active:border-b-purple-200 transition-all duration-150"
          >
            <FileJson className="w-4 h-4 text-purple-500" />
            <span>View Raw JSON</span>
          </a>
        </div>
        
        {/* View README Button */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gray-800 opacity-20 rounded-md translate-y-1 translate-x-1 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"></div>
          <a 
            href="https://docs.google.com/document/d/1Kss69QzbX6rszbKiQmuWCfSkKB9FU5zBOHr4YtAnM1Q/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gradient-to-b from-green-50 to-green-100 rounded-md border-b-2 border-green-300 group-hover:from-green-100 group-hover:to-green-200 group-active:translate-y-0.5 group-active:border-b group-active:border-b-green-200 transition-all duration-150"
          >
            <FileText className="w-4 h-4 text-green-500" />
            <span>View README</span>
          </a>
        </div>
      </div>
      
      {/* Card Container */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;