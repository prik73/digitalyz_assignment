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
    <div className="p-6 grid grid-cols-12 gap-4 min-h-screen">
      {/* Left Pane: Subject List */}
      <div className="col-span-4 lg:col-span-3 bg-gray-100 p-4 rounded-md shadow-md h-screen overflow-auto">
        <h2 className="text-lg font-bold mb-3">Subjects</h2>
        <ScrollArea className="h-[80vh]">
          <ul className="space-y-2">
            {Object.keys(data).map((courseKey) => (
              <li
                key={courseKey}
                className={`p-2 cursor-pointer rounded-md ${selectedCourse === courseKey ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                onClick={() => setSelectedCourse(courseKey)}
              >
                {data[courseKey]["Lecture Title"]}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Right Pane: Course Details */}
      <div className="col-span-8 lg:col-span-9 flex flex-col min-h-screen">
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
    <Card className="flex flex-col flex-grow p-4 h-full">
      <CardContent className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Content Wrapper for Full Height Control */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Scrollable Content */}
          <ScrollArea className="flex-grow overflow-auto">
            {/* Course Info */}
            <Table className="w-full text-sm mb-6">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(data).map(([key, value], index) => (
                  typeof value !== "object" ? (
                    <TableRow key={index}>
                      <TableCell>{key.replace(/_/g, " ")}</TableCell>
                      <TableCell>{value || "N/A"}</TableCell>
                    </TableRow>
                  ) : null
                ))}
              </TableBody>
            </Table>

            {/* Enrolled Students */}
            {data["Enrolled Students"] && (
              <>
                <h3 className="text-lg font-bold mb-2">Enrolled Students</h3>
                <Table className="w-full text-sm">
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      <TableHead>Student ID</TableHead>
                      <TableHead>College Year</TableHead>
                      <TableHead>Request Term</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data["Enrolled Students"].map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{student["Student ID"]}</TableCell>
                        <TableCell>{student["College Year"]}</TableCell>
                        <TableCell>{student["Request Term"]}</TableCell>
                        <TableCell>{student["Priority"]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
