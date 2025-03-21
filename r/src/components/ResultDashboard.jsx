import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function ResultDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("faculty"); // "faculty" | "students"

  useEffect(() => {
    fetch("/result2.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6  mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Timetable Overview</h2>

      {/* Buttons for Switching Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        <Button 
          onClick={() => setActiveTab("faculty")} 
          variant={activeTab === "faculty" ? "default" : "outline"}
        >
          Faculty View
        </Button>
        <Button 
          onClick={() => setActiveTab("students")} 
          variant={activeTab === "students" ? "default" : "outline"}
        >
          Student View
        </Button>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="h-[75vh] w-[85vw] p-1 border rounded-lg shadow-md bg-white">
        {data &&
          Object.entries(data).map(([courseKey, course]) => (
            <Card key={courseKey} className="mb-6 border border-gray-300 shadow-lg">
              <CardHeader className="bg-blue-100 p-4 rounded-t-md">
                <CardTitle className="text-lg font-semibold text-blue-700">
                  {course["Lecture Title"]}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {course.Sections.map((section, index) => (
                  <Card key={index} className="border border-gray-200 shadow-sm p-4">
                    <CardHeader>
                      <CardTitle className="text-md font-medium">
                        Section {section["Section Number"]} - Block {section["Block"]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        <strong>Room:</strong> {section["Room Number"]}
                      </p>
                      {activeTab === "faculty" ? (
                        <p className="text-sm text-gray-600">
                          <strong>Teachers:</strong> {section.Teachers.join(", ")}
                        </p>
                      ) : (
                        <div>
                          <strong className="text-sm text-gray-600">Students Enrolled:</strong>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {section.Students.map((student, idx) => (
                              <li key={idx}>
                                ID: {student["Student ID"]} | Year: {student["College Year"]} | Priority: {student.Priority}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
      </ScrollArea>
    </div>
  );
}
