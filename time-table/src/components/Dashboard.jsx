import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [selectedView, setSelectedView] = useState("faculty"); // 'faculty' or 'student'
  const [selectedId, setSelectedId] = useState(null); // Faculty ID or Student ID

  useEffect(() => {
    fetch("/result1.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Extract unique Faculty & Student IDs
  const faculties = new Set();
  const students = new Set();
  Object.values(data).forEach(course => {
    course.Sections.forEach(section => {
      section.Teachers.forEach(teacherId => faculties.add(teacherId));
      section.Students.forEach(student => students.add(student["Student ID"]));
    });
  });

  return (
    <div className="p-6 grid grid-cols-12 gap-4 min-h-screen">
      {/* Left Pane: Faculty & Student Selection */}
      <div className="col-span-4 lg:col-span-3 bg-gray-100 p-4 rounded-md shadow-md h-screen overflow-auto">
        <h2 className="text-lg font-bold mb-3">Select View</h2>
        <div className="flex space-x-2 mb-4">
          <button
            className={`p-2 w-full rounded-md ${selectedView === "faculty" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedView("faculty")}
          >
            Faculty
          </button>
          <button
            className={`p-2 w-full rounded-md ${selectedView === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedView("student")}
          >
            Student
          </button>
        </div>

        <ScrollArea className="h-[75vh]">
          <ul className="space-y-2">
            {(selectedView === "faculty" ? Array.from(faculties) : Array.from(students)).map(id => (
              <li
                key={id}
                className={`p-2 cursor-pointer rounded-md ${selectedId === id ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                onClick={() => setSelectedId(id)}
              >
                {selectedView === "faculty" ? `Professor ${id}` : `Student ${id}`}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Right Pane: Timetable Details */}
      <div className="col-span-8 lg:col-span-9 flex flex-col min-h-screen">
        {selectedId && <TimeTable data={data} selectedId={selectedId} view={selectedView} />}
      </div>
    </div>
  );
}

// Timetable Component
function TimeTable({ data, selectedId, view }) {
  const filteredCourses = Object.entries(data).filter(([_, course]) =>
    course.Sections.some(section =>
      view === "faculty" ? section.Teachers.includes(selectedId) : section.Students.some(student => student["Student ID"] === selectedId)
    )
  );

  return (
    <Card className="flex flex-col flex-grow p-4 h-full">
      <CardContent className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-4">{view === "faculty" ? `Professor ${selectedId}'s Schedule` : `Student ${selectedId}'s Schedule`}</h2>
        <ScrollArea className="flex-grow overflow-auto">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500">No assigned classes found.</p>
          ) : (
            filteredCourses.map(([courseKey, course]) => (
              <div key={courseKey} className="mb-6">
                <h3 className="text-lg font-semibold">{course["Lecture Title"]}</h3>
                <Table className="w-full text-sm">
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      <TableHead>Section</TableHead>
                      <TableHead>Block</TableHead>
                      <TableHead>Teachers</TableHead>
                      <TableHead>Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.Sections.map((section, index) => (
                      <TableRow key={index}>
                        <TableCell>{section["Section Number"]}</TableCell>
                        <TableCell>{section["Block"]}</TableCell>
                        <TableCell>{section.Teachers.join(", ")}</TableCell>
                        <TableCell>{section.Students.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
