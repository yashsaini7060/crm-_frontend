import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";

import { Check, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import HomeLayout from "@/Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "@/redux/slices/userSlice";

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Client Details" },
];
function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, selectedUser } = useSelector((state) => state.users);

  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [permissions, setPermissions] = useState([
    { key: "viewClients", label: "View Clients", value: false },
    { key: "createClients", label: "Create Clients", value: false },
    { key: "updateClients", label: "Update Clients", value: false },
    { key: "deleteClients", label: "Delete Clients", value: false },
    { key: "assignClients", label: "Assign Clients", value: false },
  ]);

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  // Update form when user data is loaded
  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role || "user");
      setIsActive(selectedUser.active ?? true);
      setPermissions(
        permissions.map((permission) => ({
          ...permission,
          value: selectedUser.permissions?.[permission.key] ?? false,
        }))
      );
    }
  }, [selectedUser]);

  const handlePermissionChange = (key) => {
    setPermissions(
      permissions.map((p) => (p.key === key ? { ...p, value: !p.value } : p))
    );
  };

  const handleSubmit = async () => {
    const userData = {
      role,
      isActive: isActive,
      permissions: {
        viewClients: permissions.find((p) => p.key === "viewClients").value,
        createClients: permissions.find((p) => p.key === "createClients").value,
        updateClients: permissions.find((p) => p.key === "updateClients").value,
        deleteClients: permissions.find((p) => p.key === "deleteClients").value,
        assignClients: permissions.find((p) => p.key === "assignClients").value,
      },
    };

    try {
      await dispatch(updateUser({ userId: id, userData })).unwrap();
      toast.success("User permissions updated successfully");
      navigate("/users-table");
    } catch (err) {
      toast.error(err.message || "Failed to update user permissions");
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
          <p className="text-red-500">Error: {error}</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Card className="p-6 max-w-3xl w-full">
          <div className="container mx-auto py-6 max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">User Permissions</h1>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <div className="mb-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Manage User Access
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Modify user permissions and roles. Only superadmins can change
                these settings.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                    <Label>{isActive ? "Active" : "Inactive"}</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base">Permissions</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  {permissions.map((permission) => (
                    <div
                      key={permission.key}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-0.5">
                        <Label>{permission.label}</Label>
                        <div className="text-sm text-muted-foreground">
                          {permission.value ? "Granted" : "Denied"}
                        </div>
                      </div>
                      <Switch
                        checked={permission.value}
                        onCheckedChange={() =>
                          handlePermissionChange(permission.key)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Check className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </HomeLayout>
  );
}
export default UpdateUser;
