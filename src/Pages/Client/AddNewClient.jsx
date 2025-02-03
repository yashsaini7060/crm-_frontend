import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createNewClient } from "@/redux/slices/clientSlice";
import { fetchSalesPersons } from "@/redux/slices/dropDownSlice";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const leadTypes = ["Hot", "Warm", "Cold"];
const refTypes = ["Website", "Referral", "Social Media", "Other"];
const queryTypes = [
  "Product Inquiry",
  "Service Request",
  "Price Quote",
  "Technical Support",
  "Partnership Opportunity",
  "General Information",
];

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Add New Client" },
];

export default function AddNewClient() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { salesPersons, loading, error } = useSelector(
    (state) => state.dropdown
  );

  useEffect(() => {
    dispatch(fetchSalesPersons());
  }, [dispatch]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      companyName: "",
      queryType: "",
      remarks: "",
      leadType: "",
      salesPerson: "",
      referenceType: "",
      potentialValue: "",
      shippingAddress: "",
      deliveryAddress: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setIsSubmitting(true);
      await dispatch(createNewClient(data)).unwrap();
      toast.success("Client added successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to add client");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Client</CardTitle>
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
          <Alert className="mb-6">
            <UserPlus className="h-4 w-4" />
            <AlertDescription>
              Adding a new client will create a new lead in the system and
              notify the assigned sales person.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter client name" />
                      </FormControl>
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
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter mobile number" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter company name" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter shipping address"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter delivery address"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="queryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select query type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {queryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter any additional remarks..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="leadType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lead type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leadTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Person</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                loading ? "Loading..." : "Select sales person"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {error ? (
                            <SelectItem value="" disabled>
                              Error loading sales persons
                            </SelectItem>
                          ) : (
                            salesPersons?.map((person) => (
                              <SelectItem key={person._id} value={person._id}>
                                {person.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referenceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reference type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {refTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="potentialValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potential Value</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter potential value"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add New Client"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </HomeLayout>
  );
}
