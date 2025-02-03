import { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from "lucide-react";
import HomeLayout from "@/Layout/HomeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Reports", href: "/reports" },
];

// Add this mock data after the breadcrumbs constant
const mockData = [
  {
    date: "2024-03-15",
    clientName: "John Smith",
    salesPerson: "Vineet",
    queryType: "Tile",
    status: "Follow Up",
    reference: "Website",
  },
  {
    date: "2024-03-14",
    clientName: "Sarah Johnson",
    salesPerson: "Rahul",
    queryType: "Marble",
    status: "Quotation",
    reference: "Walk-in",
  },
  {
    date: "2024-03-14",
    clientName: "Michael Brown",
    salesPerson: "Priya",
    queryType: "Granite",
    status: "Initial Contact",
    reference: "Referral",
  },
  {
    date: "2024-03-13",
    clientName: "Emily Davis",
    salesPerson: "Amit",
    queryType: "Flooring",
    status: "Negotiation",
    reference: "Exhibition",
  },
  {
    date: "2024-03-12",
    clientName: "David Wilson",
    salesPerson: "Suresh",
    queryType: "Ceramic Tiles",
    status: "Closing",
    reference: "Website",
  },
];

export default function Reports() {
  const [showFilters, setShowFilters] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [salesPerson, setSalesPerson] = useState("all");
  const [queryType, setQueryType] = useState("all");
  const [followUpStage, setFollowUpStage] = useState("all");
  const [refType, setRefType] = useState("all");
  const [reportType, setReportType] = useState("summary");
  const [reportData, setReportData] = useState([]);

  // Sample data - replace with your actual data source
  const salesPersons = ["All", "Vineet", "Rahul", "Amit", "Priya", "Suresh"];
  const queryTypes = [
    "All",
    "Tile",
    "Flooring",
    "Granite",
    "Marble",
    "Ceramic Tiles",
  ];
  const followUpStages = [
    "All",
    "Initial Contact",
    "Follow Up",
    "Quotation",
    "Negotiation",
    "Closing",
  ];
  const refTypes = [
    "All",
    "Website",
    "Walk-in",
    "Referral",
    "Exhibition",
    "Other",
  ];

  const handleGenerateReport = () => {
    // Filter the mock data based on selected filters
    let filteredData = [...mockData];

    if (dateFilter !== "all") {
      // Add date filtering logic here
      // This is a simplified example
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date);
        const today = new Date();

        switch (dateFilter) {
          case "today":
            return item.date === today.toISOString().split("T")[0];
          case "thisWeek":
            const weekAgo = new Date(today.setDate(today.getDate() - 7));
            return new Date(item.date) >= weekAgo;
          // Add other date filter cases as needed
          default:
            return true;
        }
      });
    }

    if (salesPerson !== "all") {
      filteredData = filteredData.filter(
        (item) => item.salesPerson.toLowerCase() === salesPerson
      );
    }

    if (queryType !== "all") {
      filteredData = filteredData.filter(
        (item) => item.queryType.toLowerCase() === queryType
      );
    }

    if (followUpStage !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status.toLowerCase() === followUpStage
      );
    }

    if (refType !== "all") {
      filteredData = filteredData.filter(
        (item) => item.reference.toLowerCase() === refType
      );
    }

    setReportData(filteredData);
  };

  const handleDownloadReport = () => {
    if (reportData.length === 0) {
      alert("Please generate a report first");
      return;
    }

    // Create CSV content
    const headers = [
      "Date",
      "Client Name",
      "Sales Person",
      "Query Type",
      "Status",
      "Reference",
    ];
    const csvContent = [
      headers.join(","),
      ...reportData.map((row) =>
        [
          row.date,
          row.clientName,
          row.salesPerson,
          row.queryType,
          row.status,
          row.reference,
        ].join(",")
      ),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleResetFilters = () => {
    setDateFilter("all");
    setDateRange({ start: "", end: "" });
    setSalesPerson("all");
    setQueryType("all");
    setFollowUpStage("all");
    setRefType("all");
    setReportType("summary");
  };

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div className="p-2 md:p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Generate Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Report Type Selection */}
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="detailed">Detailed Report</SelectItem>
                    <SelectItem value="sales">Sales Person Report</SelectItem>
                    <SelectItem value="followup">Follow-up Report</SelectItem>
                    <SelectItem value="conversion">
                      Conversion Report
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filters Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {showFilters ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleResetFilters}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleGenerateReport}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Date Filter */}
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                          <SelectItem value="thisMonth">This Month</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {dateFilter === "custom" && (
                      <div className="space-y-2 col-span-full">
                        <Label>Custom Date Range</Label>
                        <div className="flex gap-4">
                          <Input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) =>
                              setDateRange((prev) => ({
                                ...prev,
                                start: e.target.value,
                              }))
                            }
                          />
                          <Input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) =>
                              setDateRange((prev) => ({
                                ...prev,
                                end: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Sales Person Filter */}
                    <div className="space-y-2">
                      <Label>Sales Person</Label>
                      <Select
                        value={salesPerson}
                        onValueChange={setSalesPerson}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sales Person" />
                        </SelectTrigger>
                        <SelectContent>
                          {salesPersons.map((person) => (
                            <SelectItem
                              key={person}
                              value={person.toLowerCase()}
                            >
                              {person}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Query Type Filter */}
                    <div className="space-y-2">
                      <Label>Query Type</Label>
                      <Select value={queryType} onValueChange={setQueryType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Query Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {queryTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Follow Up Stage Filter */}
                    <div className="space-y-2">
                      <Label>Follow Up Stage</Label>
                      <Select
                        value={followUpStage}
                        onValueChange={setFollowUpStage}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Follow Up Stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {followUpStages.map((stage) => (
                            <SelectItem key={stage} value={stage.toLowerCase()}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reference Type Filter */}
                    <div className="space-y-2">
                      <Label>Reference Type</Label>
                      <Select value={refType} onValueChange={setRefType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Reference Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {refTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Report Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Sales Person</TableHead>
                          <TableHead>Query Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportData.length > 0 ? (
                          reportData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.date}</TableCell>
                              <TableCell>{row.clientName}</TableCell>
                              <TableCell>{row.salesPerson}</TableCell>
                              <TableCell>{row.queryType}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>{row.reference}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              className="text-muted-foreground"
                              colSpan={6}
                            >
                              Generate a report to see the preview
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}
