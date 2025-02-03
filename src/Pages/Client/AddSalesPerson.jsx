import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, UserPlus } from "lucide-react";
import HomeLayout from "@/Layout/HomeLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useNavigate, Link } from "react-router";


const leadTypes = ["Hot", "Warm", "Cold"];
const refTypes = ["Website", "Referral", "Social Media", "Other"];
const salesPersons = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
];
const queryTypes = [
  "Product Inquiry",
  "Service Request",
  "Price Quote",
  "Technical Support",
  "Partnership Opportunity",
  "General Information",
];
const potentialValues = [
  "0-1000",
  "1000-5000",
  "5000-10000",
  "10000-50000",
  "50000+",
];
const roles = ["Manager", "Sales Executive", "Support Staff"];
const zones = ["North", "South", "East", "West"];
const designations = ["Junior", "Senior", "Lead"];
const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Add New Sales Person" },
];

export default function AddSalesPerson() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      empId: "",
      role: "",
      zone: "",
      email: "",
      phone: "",
      reportingTo: "",
      designation: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await sendPasswordResetEmail(data.email); // Send email for setting password
      alert("Sales person added successfully. Password reset email sent.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send password reset email.");
    }
  };

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Sales Person</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter name" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="empId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter employee ID" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {zones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              {zone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter email address"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reportingTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reporting To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reporting person" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {salesPersons.map((person) => (
                            <SelectItem key={person} value={person}>
                              {person}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {designations.map((designation) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />


              </div>

              <div className="flex justify-end">
                <Button type="submit">Add New Sales Person</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </HomeLayout>
  );
}
