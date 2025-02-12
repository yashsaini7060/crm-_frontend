import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import HomeLayout from "@/Layout/HomeLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuotations,
  deleteQuotation,
} from "@/redux/slices/quotationSlice";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function QuotationsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quotations, loading, error } = useSelector(
    (state) => state.quotations
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(quotations.length / 10);
  const [quotationToDelete, setQuotationToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllQuotations());
  }, [dispatch]);

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Quotations" },
  ];

  const handleDeleteConfirm = async () => {
    if (!quotationToDelete) return;

    try {
      await dispatch(deleteQuotation(quotationToDelete)).unwrap();
      toast.success("Quotation deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete quotation");
    } finally {
      setQuotationToDelete(null);
    }
  };

  if (loading) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </HomeLayout>
    );
  }

  // Calculate paginated quotations
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedQuotations = quotations.slice(startIndex, endIndex);

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <AlertDialog
        open={!!quotationToDelete}
        onOpenChange={() => setQuotationToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              quotation and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="p-2 sm:p-4 md:p-6 max-w-[100vw] overflow-x-hidden">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
              Quotations
            </CardTitle>
          </CardHeader>
          <div className="mx-2 sm:mx-4">
            <div className="overflow-x-auto border rounded-md mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quotation ID</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedQuotations.map((quotation) => (
                    <TableRow key={quotation._id}>
                      <TableCell className="font-medium">
                        {quotation.quotationId}
                      </TableCell>
                      <TableCell>{quotation.clientName}</TableCell>
                      <TableCell>
                        {new Date(quotation.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{quotation.totalAmount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(quotation.status)}
                        >
                          {quotation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/view-quotation/${quotation._id}`)
                              }
                              className="flex items-center cursor-pointer"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/edit-quotation/${quotation._id}`)
                              }
                              className="flex items-center cursor-pointer"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setQuotationToDelete(quotation._id)
                              }
                              className="text-destructive flex items-center cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
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
          <div className="my-4 flex justify-center">
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
                      setCurrentPage((page) => Math.min(totalPages, page + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>
    </HomeLayout>
  );
}

export default QuotationsTable;
