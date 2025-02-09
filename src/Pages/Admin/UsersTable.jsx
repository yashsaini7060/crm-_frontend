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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { getAllUsers, deleteUser } from "@/redux/slices/userSlice";
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

function formatPermissionName(key) {
  const nameMap = {
    viewClients: "View Clients",
    createClients: "Create Clients",
    updateClients: "Update Clients",
    deleteClients: "Delete Clients",
    assignClients: "Assign Clients",
  };
  return nameMap[key] || key;
}

function UsersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / 10);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "superadmin":
        return "destructive";
      case "admin":
        return "default";
      default:
        return "secondary";
    }
  };
  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Users" },
  ];

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await dispatch(deleteUser(userToDelete)).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    } finally {
      setUserToDelete(null);
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

  // Calculate paginated users
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user &apos;s account and remove their data from our servers.
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
              Users
            </CardTitle>
          </CardHeader>
          <div className="mx-2 sm:mx-4">
            <div className="overflow-x-auto border rounded-md mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isActive ? "success" : "secondary"}
                          className="font-medium"
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions &&
                            Object.entries(user.permissions)
                              .filter(([, value]) => value === true)
                              .map(([key]) => (
                                <Badge
                                  key={key}
                                  variant="outline"
                                  className="text-xs whitespace-nowrap"
                                >
                                  {formatPermissionName(key)}
                                </Badge>
                              ))}
                          {(!user.permissions ||
                            Object.values(user.permissions).every(
                              (v) => v === false
                            )) && (
                            <span className="text-xs text-muted-foreground">
                              No permissions
                            </span>
                          )}
                        </div>
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
                                navigate(`/update-user/${user._id}`)
                              }
                              className="flex items-center cursor-pointer"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setUserToDelete(user._id)}
                              className="text-destructive flex items-center cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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

export default UsersTable;
