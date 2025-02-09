import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Building, Flag, Edit2, Save, X } from "lucide-react";
import { Link, useParams } from "react-router";
import HomeLayout from "@/Layout/HomeLayout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateClient } from "@/redux/slices/clientSlice";
import { toast } from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Client Details" },
];

export default function ViewDetails() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(null);
  const clientDetails = useSelector((state) => {
    const data = state.client.clientData.find(
      (client) => client.id === parseInt(id) || client.id === id
    );
    console.log(data);
    return data;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientDetails) {
      setEditedDetails({ ...clientDetails }); // Ensure we copy the clientDetails into editedDetails
    }
  }, [clientDetails]);

  if (!clientDetails) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <Card className="max-w-3xl mx-auto p-4 sm:p-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
          </div>
        </Card>
      </HomeLayout>
    );
  }

  const handleInputChange = (field, value) => {
    setEditedDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log(editedDetails);
      await dispatch(updateClient(editedDetails)).unwrap();
      setIsEditing(false);
      toast.success("Client details updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update client details");
    }
  };

  const handleCancel = () => {
    setEditedDetails({ ...clientDetails }); // Reset to original data if canceled
    setIsEditing(false);
  };

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Card className="w-[95%] md:w-[60%] lg:w-[40%] mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Client Details
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage client information
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </>
              )}
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Personal Information Card */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  {isEditing ? (
                    <Input
                      value={editedDetails?.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg font-semibold">
                      {editedDetails?.name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedDetails?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{editedDetails?.email || "N/A"}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile</p>
                  {isEditing ? (
                    <Input
                      value={editedDetails?.mobile || ""}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{editedDetails?.mobile || "N/A"}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information Card */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Building className="mr-2 h-4 w-4" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  {isEditing ? (
                    <Input
                      value={editedDetails?.companyName || ""}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg font-semibold">
                      {editedDetails?.companyName || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Query</p>
                  {isEditing ? (
                    <Input
                      value={editedDetails?.queryType || ""}
                      onChange={(e) =>
                        handleInputChange("queryType", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">
                      {editedDetails?.queryType || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Potential Value
                  </p>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedDetails?.potentialValue || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "potentialValue",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg font-semibold">
                      {editedDetails?.potentialValue?.toLocaleString() || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Information Card */}
          <Card className="w-full col-span-1 md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Flag className="mr-2 h-4 w-4" />
                Lead Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Lead Type
                    </p>
                    <Badge
                      variant="secondary"
                      className={`${
                        editedDetails?.leadType === "Hot"
                          ? "bg-red-100 text-red-800"
                          : ""
                      } ${
                        editedDetails?.leadType === "Warm"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      } ${
                        editedDetails?.leadType === "Cold"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      } text-base px-3 py-1 font-medium`}
                    >
                      {editedDetails?.leadType || "N/A"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Sales Person
                    </p>
                    <p className="text-lg">
                      {editedDetails?.salesPerson?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Next Follow Up
                    </p>
                    <p className="text-lg">
                      {editedDetails?.nextFollowUpDate
                        ? new Date(
                            editedDetails.nextFollowUpDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Follow Up Stage
                    </p>
                    <Badge variant="outline" className="text-base px-3 py-1">
                      {editedDetails?.status || "N/A"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Reference Type
                    </p>
                    <p className="text-lg">
                      {editedDetails?.referenceType || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Contact
                    </p>
                    <p className="text-lg">
                      {editedDetails?.lastContact || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Remarks Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500">
                    Remarks & History
                  </p>
                  {isEditing && (
                    <Badge variant="outline" className="text-xs">
                      Adding New Remark
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {editedDetails?.followUps?.map((followup, index) => (
                      <AccordionItem key={followup._id} value={`item-${index}`}>
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex justify-between items-center w-full pr-4">
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="outline"
                                className="text-sm px-3 py-1"
                              >
                                {format(new Date(followup.date), "dd MMM yyyy")}
                              </Badge>
                              <span className="text-base font-medium">
                                {followup.followUpType}
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`text-sm px-3 py-1 ${
                                followup.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {followup.status}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <p className="text-base font-medium text-gray-500 mb-2">
                                  Time
                                </p>
                                <p className="text-base">{followup.time}</p>
                              </div>
                              <div>
                                <p className="text-base font-medium text-gray-500 mb-2">
                                  Type
                                </p>
                                <p className="text-base capitalize">
                                  {followup.followUpType}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-base font-medium text-gray-500 mb-2">
                                  Remarks
                                </p>
                                <p className="text-base leading-relaxed">
                                  {followup.remarks}
                                </p>
                              </div>
                              <div>
                                <p className="text-base font-medium text-gray-500 mb-2">
                                  Created At
                                </p>
                                <p className="text-base">
                                  {format(
                                    new Date(followup.createdAt),
                                    "dd MMM yyyy HH:mm"
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-base font-medium text-gray-500 mb-2">
                                  Updated At
                                </p>
                                <p className="text-base">
                                  {format(
                                    new Date(followup.updatedAt),
                                    "dd MMM yyyy HH:mm"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>
    </HomeLayout>
  );
}
