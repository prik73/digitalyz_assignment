import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Users, BookOpen, MapPin, Clock } from "lucide-react";

export default function EnhancedTimetableDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const [role, setRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState("");

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

  const toggleSection = (courseKey, sectionIndex) => {
    const sectionId = `${courseKey}-${sectionIndex}`;
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const filterTimetable = () => {
    if (!data) return {};

    if (role === "all" || !selectedUser) {
      return data;
    }

    return Object.entries(data).reduce((filtered, [courseKey, course]) => {
      const filteredSections = course.Sections.filter((section) =>
        role === "student"
          ? section.Students.some((s) => s["Student ID"] === selectedUser)
          : section.Teachers.includes(selectedUser)
      );

      if (filteredSections.length > 0) {
        filtered[courseKey] = { ...course, Sections: filteredSections };
      }

      return filtered;
    }, {});
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader className="animate-spin w-10 h-10 text-blue-600 mb-4" />
        <p className="text-gray-600">Loading timetable data...</p>
      </div>
    );
  }

  const filteredData = filterTimetable();
  const allProfessors = new Set();
  const allStudents = new Set();

  Object.values(data).forEach((course) => {
    course.Sections.forEach((section) => {
      section.Teachers.forEach((teacher) => allProfessors.add(teacher));
      section.Students.forEach((student) => allStudents.add(student["Student ID"]));
    });
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-screen">
      <Card className="w-full mx-auto bg-white shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Academic Timetable Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* User Role Selection */}
          <div className="mb-4 flex gap-4">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
              </SelectContent>
            </Select>

            {/* User Selection */}
            {role !== "all" && (
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-56">
                  <SelectValue placeholder={`Select ${role === "student" ? "Student" : "Professor"}`} />
                </SelectTrigger>
                <SelectContent>
                  {(role === "student" ? [...allStudents] : [...allProfessors]).map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex justify-center  bg-gray-100 rounded-none p-0 ">
              <TabsTrigger value="overview" className="flex-1 py-3 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1 py-3 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none">
                Detailed View
              </TabsTrigger>
            </TabsList>

            {/* Timetable Display */}
            <TabsContent value="overview" className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                {Object.entries(filteredData).map(([courseKey, course]) => (
                  <Card key={courseKey} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold text-blue-700">{course["Lecture Title"]}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {course.Sections.map((section, index) => (
                          <div
                            key={index}
                            className="flex flex-col p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                            onClick={() => toggleSection(courseKey, index)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2 bg-blue-50">
                                  Section {section["Section Number"]}
                                </Badge>
                                <span className="text-sm font-medium">Block {section["Block"]}</span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>Room {section["Room Number"]}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="p-4">
  <div className="space-y-4">
    {Object.entries(filteredData).map(([courseKey, course]) => (
      <Card key={courseKey} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-blue-700">{course["Lecture Title"]}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-64">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Professors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.Sections.map((section, index) => (
                  <TableRow key={index}>
                    <TableCell>Section {section["Section Number"]}</TableCell>
                    <TableCell>{section["Block"]}</TableCell>
                    <TableCell>{section["Room Number"]}</TableCell>
                    <TableCell>{section["Time Slot"]}</TableCell>
                    <TableCell>{section.Teachers.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
