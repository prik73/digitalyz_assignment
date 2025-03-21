import { Link } from "react-router-dom";
import RDashboard from "./ResultDashboard"; // Dashboard for result1.json

export default function Timetable() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-6">College Timetable</h1>
      <RDashboard /> {/* This will display result1.json */}

      {/* Button to go back */}
      <Link to="/">
        <button className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Back to Main App
        </button>
      </Link>
    </div>
  );
}
