import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import HomeLayout from "@/Layout/HomeLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetails, transferLead } from "@/redux/slices/clientSlice";
import { toast } from "react-hot-toast";
import { fetchSalesPersons } from "@/redux/slices/dropDownSlice";

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Lead Transfer" },
];

const formSchema = z.object({
  clientName: z.string().optional(),
  currentSalesPerson: z.string().optional(),
  newSalesPerson: z.string({
    required_error: "Please select a new sales person",
  }),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must not exceed 500 characters"),
});

export default function LeadTransfer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { selectedClient, isError } = useSelector((state) => state.client);
  const { salesPersons, error } = useSelector((state) => state.dropdown);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      currentSalesPerson: "",
      newSalesPerson: "",
      reason: "",
    },
  });
  useEffect(() => {
    dispatch(fetchSalesPersons());
  }, [dispatch]);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getClientDetails(id)).unwrap();

        if (response?.data) {
          form.reset({
            clientName: response.data.name,
            currentSalesPerson: response.data.salesPerson?._id || "",
            newSalesPerson: "",
            reason: "",
          });
        }

        if (isError) {
          throw new Error("Failed to fetch client details");
        }
      } catch (error) {
        console.error("Error fetching lead:", error);
        toast.error("Failed to fetch client details");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLeadData();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        transferLead({
          clientId: id,
          toSalesPerson: data.newSalesPerson,
          reason: data.reason,
        })
      ).unwrap();

      toast.success("Lead transferred successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error transferring lead:", error);
      toast.error(error.error || "Failed to transfer lead");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Card className="w-[90%] max-w-lg mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Transfer Lead</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={selectedClient?.name || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentSalesPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Sales Person</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={selectedClient?.salesPerson?.name || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newSalesPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Sales Person</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new sales person" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {error ? (
                            <SelectItem value="" disabled>
                              Error loading sales persons
                            </SelectItem>
                          ) : (
                            salesPersons
                              ?.filter(
                                (person) =>
                                  person._id !==
                                  selectedClient?.salesPerson?._id
                              )
                              .map((person) => (
                                <SelectItem key={person._id} value={person._id}>
                                  {person.name}
                                </SelectItem>
                              ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Transfer</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the reason for lead transfer"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    Transfer Lead
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </HomeLayout>
  );
}
