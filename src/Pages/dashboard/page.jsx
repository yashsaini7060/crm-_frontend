import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  CheckSquare,
  RefreshCcw,
  Trash,
  Info,
  Filter,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  UserPlus,
  MoreHorizontal,
  UserMinus,
  ClipboardList,
} from "lucide-react";
import HomeLayout from "@/Layout/HomeLayout";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { getAllClients, deleteClient } from "@/redux/slices/clientSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const DataRemarks = [
  {
    id: 1,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "drift",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 2,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "call not pick",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "Medium",
  },
  {
    id: 3,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "out of town",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "Low",
  },
  {
    id: 4,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "come next week",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 5,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "quotation send",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 6,
    date: "2024-12-26",
    clientName: "name 002",
    mob: "9478118701",
    query: "Flooring",
    remarks: "interested in marble",
    salesPerson: "Rahul",
    nextFollowUp: "2024-12-29 14:00",
    followUpStage: "Initial Contact",
    refType: "Website",
    priority: "High",
  },
  {
    id: 7,
    date: "2024-12-26",
    clientName: "name 003",
    mob: "9478118702",
    query: "Granite",
    remarks: "price quotation requested",
    salesPerson: "Amit",
    nextFollowUp: "2024-12-30 11:30",
    followUpStage: "Quotation",
    refType: "Referral",
    priority: "High",
  },
  {
    id: 8,
    date: "2024-12-27",
    clientName: "name 004",
    mob: "9478118703",
    query: "Marble",
    remarks: "sample requested",
    salesPerson: "Priya",
    nextFollowUp: "2024-12-31 16:00",
    followUpStage: "Sample Review",
    refType: "Walk-in",
    priority: "High",
  },
  {
    id: 9,
    date: "2024-12-27",
    clientName: "name 005",
    mob: "9478118704",
    query: "Ceramic Tiles",
    remarks: "comparing prices",
    salesPerson: "Suresh",
    nextFollowUp: "2025-01-02 10:00",
    followUpStage: "Negotiation",
    refType: "Online",
    priority: "High",
  },
  {
    id: 10,
    date: "2024-12-28",
    clientName: "name 006",
    mob: "9478118705",
    query: "Vitrified Tiles",
    remarks: "final discussion",
    salesPerson: "Vineet",
    nextFollowUp: "2025-01-03 15:30",
    followUpStage: "Closing",
    refType: "Exhibition",
    priority: "High",
  },
  {
    id: 1,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "drift",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 2,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "call not pick",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "Medium",
  },
  {
    id: 3,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "out of town",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "Low",
  },
  {
    id: 4,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "come next week",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 5,
    date: "2024-12-25",
    clientName: "name 001",
    mob: "9478118700",
    query: "Tile",
    remarks: "quotation send",
    salesPerson: "Vineet",
    nextFollowUp: "2024-12-28 17:03",
    followUpStage: "Follow Up",
    refType: "Other",
    priority: "High",
  },
  {
    id: 6,
    date: "2024-12-26",
    clientName: "name 002",
    mob: "9478118701",
    query: "Flooring",
    remarks: "interested in marble",
    salesPerson: "Rahul",
    nextFollowUp: "2024-12-29 14:00",
    followUpStage: "Initial Contact",
    refType: "Website",
    priority: "High",
  },
  {
    id: 7,
    date: "2024-12-26",
    clientName: "name 003",
    mob: "9478118702",
    query: "Granite",
    remarks: "price quotation requested",
    salesPerson: "Amit",
    nextFollowUp: "2024-12-30 11:30",
    followUpStage: "Quotation",
    refType: "Referral",
    priority: "High",
  },
  {
    id: 8,
    date: "2024-12-27",
    clientName: "name 004",
    mob: "9478118703",
    query: "Marble",
    remarks: "sample requested",
    salesPerson: "Priya",
    nextFollowUp: "2024-12-31 16:00",
    followUpStage: "Sample Review",
    refType: "Walk-in",
    priority: "High",
  },
  {
    id: 9,
    date: "2024-12-27",
    clientName: "name 005",
    mob: "9478118704",
    query: "Ceramic Tiles",
    remarks: "comparing prices",
    salesPerson: "Suresh",
    nextFollowUp: "2025-01-02 10:00",
    followUpStage: "Negotiation",
    refType: "Online",
    priority: "High",
  },
  {
    id: 10,
    date: "2024-12-28",
    clientName: "name 006",
    mob: "9478118705",
    query: "Vitrified Tiles",
    remarks: "final discussion",
    salesPerson: "Vineet",
    nextFollowUp: "2025-01-03 15:30",
    followUpStage: "Closing",
    refType: "Exhibition",
    priority: "High",
  },
];
const breadcrumbs = [{ text: "Dashboard", href: "/dashboard" }];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPersonFilter, setSalesPersonFilter] = useState("all");
  const [queryFilter, setQueryFilter] = useState("all");
  const [followUpStageFilter, setFollowUpStageFilter] = useState("all");
  const [refTypeFilter, setRefTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const itemsPerPage = 7;
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadTypeFilter, setLeadTypeFilter] = useState("all");
  const [clientList, setClientList] = useState(DataRemarks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getAllClients()).unwrap();
        console.log(response);
        setClientList(response);
        setError(null);
      } catch (error) {
        setError("Failed to fetch clients. Please try again later.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [dispatch]);

  const handleDeleteClient = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await dispatch(deleteClient(clientId)).unwrap();
        // Update the client list by filtering out the deleted client
        setClientList((prevList) =>
          prevList.filter((client) => client._id !== clientId)
        );
        toast.success("Client deleted successfully");
      } catch (error) {
        toast.error("Failed to delete the client", error);
        // You might want to show an error message to the user here
      }
    }
  };
  // Get unique sales persons for filter
  const uniqueSalesPersons = [
    ...new Set(
      clientList.map((item) => item.salesPerson?.name).filter(Boolean)
    ),
  ];

  // Get unique values for filters
  const uniqueQueries = [...new Set(clientList.map((item) => item.queryType))];
  const uniqueFollowUpStages = [
    ...new Set(clientList.map((item) => item.status)),
  ];
  const uniqueRefTypes = [
    ...new Set(clientList.map((item) => item.referenceType)),
  ];

  // Add this helper function before the return statement
  const getFilteredByDate = (data) => {
    if (dateFilter === "all") return data;

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    switch (dateFilter) {
      case "today":
        return data.filter(
          (item) =>
            new Date(item.createdAt).toDateString() === today.toDateString()
        );
      case "thisWeek":
        return data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= startOfWeek && itemDate <= today;
        });
      case "custom":
        if (!dateRange.start || !dateRange.end) return data;
        return data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate >= new Date(dateRange.start) &&
            itemDate <= new Date(dateRange.end)
          );
        });
      default:
        return data;
    }
  };

  // Update the filteredData constant with fixed mobile number search
  const filteredData = getFilteredByDate(
    clientList.filter((item) => {
      // Normalize search query
      const query = searchQuery.toLowerCase().trim();

      // Special handling for mobile number search - check if query is numeric
      if (/^\d+$/.test(query)) {
        return item.mobile.includes(query);
      }

      // If no search query, only apply other filters
      const matchesSearch =
        !query ||
        item.clientName.toLowerCase().includes(query) ||
        item.queryType.toLowerCase().includes(query) ||
        item.remarks.toLowerCase().includes(query) ||
        item.salesPerson?.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.referenceType.toLowerCase().includes(query);

      const matchesSalesPerson =
        salesPersonFilter === "all" ||
        item.salesPerson?.name === salesPersonFilter;

      const matchesQuery =
        queryFilter === "all" || item.queryType === queryFilter;

      const matchesFollowUpStage =
        followUpStageFilter === "all" || item.status === followUpStageFilter;

      const matchesRefType =
        refTypeFilter === "all" || item.referenceType === refTypeFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesLeadType =
        leadTypeFilter === "all" || item.leadType === leadTypeFilter;

      return (
        matchesSearch &&
        matchesSalesPerson &&
        matchesQuery &&
        matchesFollowUpStage &&
        matchesRefType &&
        matchesStatus &&
        matchesLeadType
      );
    })
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedRemarks = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Add handler for status badge clicks
  const handleStatusClick = (status) => {
    // Toggle the status filter
    setStatusFilter((prev) => (prev === status ? "all" : status));
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  // Update the Badge components in the Status Card to show they are clickable
  const StatusBadge = ({ status, count, onClick, isSelected }) => (
    <Badge
      variant="secondary"
      className={`
        cursor-pointer 
        transition-colors
        ${
          status === "Follow Up"
            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            : ""
        }
        ${
          status === "Won"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : ""
        }
        ${status === "Lost" ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}
        ${
          status === "Hold"
            ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
            : ""
        }
        ${
          status === "Quotation"
            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
            : ""
        }
        ${
          isSelected
            ? "ring-2 ring-offset-1 ring-offset-white " +
              (status === "Follow Up"
                ? "ring-yellow-400"
                : status === "Won"
                ? "ring-green-400"
                : status === "Lost"
                ? "ring-red-400"
                : status === "Hold"
                ? "ring-orange-400"
                : "ring-blue-400")
            : ""
        }
      `}
      onClick={onClick}
    >
      {status}: {count}
    </Badge>
  );

  // Add prop types for StatusBadge
  StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  if (error) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="p-4 text-red-500">{error}</div>
      </HomeLayout>
    );
  }

  if (loading) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div className="p-2 sm:p-4 md:p-6 max-w-[100vw] overflow-x-hidden">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
              CRM Dashboard
            </CardTitle>
          </CardHeader>

          {/* Cards Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 sm:p-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Follow Up
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Today</span>
                    <span className="text-sm font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Weekly
                    </span>
                    <span className="text-sm font-medium">87</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Monthly
                    </span>
                    <span className="text-sm font-medium">256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Yearly
                    </span>
                    <span className="text-sm font-medium">3,429</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Status
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge
                    status="Follow Up"
                    count="145"
                    onClick={() => handleStatusClick("Follow Up")}
                    isSelected={statusFilter === "Follow Up"}
                  />
                  <StatusBadge
                    status="Won"
                    count="67"
                    onClick={() => handleStatusClick("Won")}
                    isSelected={statusFilter === "Won"}
                  />
                  <StatusBadge
                    status="Lost"
                    count="23"
                    onClick={() => handleStatusClick("Lost")}
                    isSelected={statusFilter === "Lost"}
                  />
                  <StatusBadge
                    status="Hold"
                    count="12"
                    onClick={() => handleStatusClick("Hold")}
                    isSelected={statusFilter === "Hold"}
                  />
                  <StatusBadge
                    status="Quotation"
                    count="34"
                    onClick={() => handleStatusClick("Quotation")}
                    isSelected={statusFilter === "Quotation"}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Task Info</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Tasks
                    </span>
                    <Badge variant="secondary">234</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      178
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Pending
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      56
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <CardContent>
            <Card className="mb-6">
              <CardContent className="p-2 sm:p-4">
                {/* Search and Actions Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSalesPersonFilter("all");
                        setQueryFilter("all");
                        setFollowUpStageFilter("all");
                        setRefTypeFilter("all");
                        setDateFilter("all");
                        setDateRange({ start: "", end: "" });
                      }}
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Reset</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filters</span>
                      {showFilters ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link to="/add-new-client" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Add New Client</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  </Link>
                  <Link to="/bulk-client-upload" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Bulk Upload</span>
                      <span className="sm:hidden">Upload</span>
                    </Button>
                  </Link>
                </div>

                {/* Filters Section */}
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    {/* Date Filter */}
                    <div className="col-span-1 sm:col-span-2">
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Date Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Custom Date Range */}
                    {dateFilter === "custom" && (
                      <div className="col-span-1 sm:col-span-2 flex gap-2">
                        <Input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) =>
                            setDateRange((prev) => ({
                              ...prev,
                              start: e.target.value,
                            }))
                          }
                          className="w-full"
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
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Other Filters */}
                    <Select
                      value={salesPersonFilter}
                      onValueChange={setSalesPersonFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sales Person" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sales Persons</SelectItem>
                        {uniqueSalesPersons.map((person) => (
                          <SelectItem key={person} value={person}>
                            {person}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={queryFilter} onValueChange={setQueryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Query Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Queries</SelectItem>
                        {uniqueQueries.map((query) => (
                          <SelectItem key={query} value={query}>
                            {query}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={followUpStageFilter}
                      onValueChange={setFollowUpStageFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Follow Up Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {uniqueFollowUpStages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={refTypeFilter}
                      onValueChange={setRefTypeFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Reference Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All References</SelectItem>
                        {uniqueRefTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={leadTypeFilter}
                      onValueChange={setLeadTypeFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Lead Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Lead Types</SelectItem>
                        <SelectItem value="Hot">Hot</SelectItem>
                        <SelectItem value="Warm">Warm</SelectItem>
                        <SelectItem value="Cold">Cold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Table Section */}
                <div className="mx-2 sm:mx-4">
                  <div className="overflow-x-auto border rounded-md mt-4">
                    <Table className="w-full min-w-[800px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Mobile No.</TableHead>
                          <TableHead>Lead Type</TableHead>
                          <TableHead>Query</TableHead>
                          <TableHead>Remarks</TableHead>
                          <TableHead>Sales Person</TableHead>
                          <TableHead>Next Follow Up</TableHead>
                          <TableHead>Follow Up Stage</TableHead>
                          <TableHead>Reference Type</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedRemarks.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.name}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.mobile}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              <Badge
                                variant="secondary"
                                className={`text-xs sm:text-sm ${
                                  item.leadType === "Hot"
                                    ? "bg-red-100 text-red-800"
                                    : item.leadType === "Warm"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.leadType || "Cold"}
                              </Badge>
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.queryType}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.remarks}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.salesPerson?.name}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.nextFollowUpDate
                                ? new Date(
                                    item.nextFollowUpDate
                                  ).toLocaleString()
                                : "Not scheduled"}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.status}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              {item.referenceType}
                            </TableCell>
                            <TableCell className="p-2 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[100px]">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-[160px]"
                                >
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(`/client/view/${item.id}`)
                                    }
                                  >
                                    <Info className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(
                                        `/client/update-status/${item.id}`
                                      )
                                    }
                                  >
                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                    Update Status
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(`/lead-transfer/${item.id}`)
                                    }
                                  >
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Lead Transfer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(`/quotation/${item.id}`)
                                    }
                                  >
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Quotations
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteClient(item._id)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent className="flex flex-wrap justify-center gap-2">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((page) => Math.max(1, page - 1));
                          }}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((page) =>
                              Math.min(totalPages, page + 1)
                            );
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}
