import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("/output3.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setSelectedCourse(Object.keys(jsonData)[0]); // Default to first course
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div className="p-3 md:p-5 grid grid-cols-12 gap-8 min-h-screen bg-slate-50">
      {/* Left Pane: Subject List */}
      <div className="col-span-5 lg:col-span-4 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-lg font-medium text-slate-800 px-2">Subjects</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-7rem)]">
          <div className="p-3">
            <ul className="space-y-2">
              {Object.keys(data).map((courseKey) => (
                <li
                  key={courseKey}
                  className={`px-4 py-3 text-sm rounded-md cursor-pointer transition-colors duration-150 ${
                    selectedCourse === courseKey 
                      ? "bg-slate-100 text-slate-900 font-medium" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setSelectedCourse(courseKey)}
                >
                  {data[courseKey]["Lecture Title"]}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      {/* Right Pane: Course Details */}
      <div className="col-span-7 lg:col-span-8 flex flex-col">
        {selectedCourse && data[selectedCourse] && (
          <CourseDetails title={data[selectedCourse]["Lecture Title"]} data={data[selectedCourse]} />
        )}
      </div>
    </div>
  );
}

// Course Details Component
function CourseDetails({ title, data }) {
  return (
    <Card className="flex flex-col flex-grow border-slate-200 shadow-sm bg-white overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-100">
        <h2 className="text-xl font-medium text-slate-800">{title}</h2>
      </div>
      <CardContent className="flex flex-col flex-grow p-0">
        {/* Content Wrapper for Full Height Control */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Scrollable Content */}
          <ScrollArea className="flex-grow p-8">
            {/* Course Info */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Course Information</h3>
              <div className="bg-slate-50 rounded-lg overflow-hidden mb-2">
                <Table className="w-full text-sm">
                  <TableBody>
                    {Object.entries(data).map(([key, value], index) => (
                      typeof value !== "object" ? (
                        <TableRow key={index} className="border-b border-slate-100 last:border-0">
                          <TableCell className="py-4 px-6 text-slate-600 font-medium">{key.replace(/_/g, " ")}</TableCell>
                          <TableCell className="py-4 px-6 text-slate-800">{value || "—"}</TableCell>
                        </TableRow>
                      ) : null
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Enrolled Students */}
            {data["Enrolled Students"] && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Enrolled Students</h3>
                <div className="bg-slate-50 rounded-lg overflow-hidden">
                  <Table className="w-full text-sm">
                    <TableHeader>
                      <TableRow className="border-b border-slate-200">
                        <TableHead className="py-4 px-6 text-slate-600 font-medium bg-slate-100">Student ID</TableHead>
                        <TableHead className="py-4 px-6 text-slate-600 font-medium bg-slate-100">College Year</TableHead>
                        <TableHead className="py-4 px-6 text-slate-600 font-medium bg-slate-100">Request Term</TableHead>
                        <TableHead className="py-4 px-6 text-slate-600 font-medium bg-slate-100">Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data["Enrolled Students"].map((student, index) => (
                        <TableRow key={index} className="border-b border-slate-100 last:border-0 hover:bg-white transition-colors duration-150">
                          <TableCell className="py-4 px-6 text-slate-800">{student["Student ID"]}</TableCell>
                          <TableCell className="py-4 px-6 text-slate-800">{student["College Year"]}</TableCell>
                          <TableCell className="py-4 px-6 text-slate-800">{student["Request Term"]}</TableCell>
                          <TableCell className="py-4 px-6 text-slate-800">{student["Priority"]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}