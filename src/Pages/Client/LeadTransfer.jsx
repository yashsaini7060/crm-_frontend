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
import { ArrowLeft } from "lucide-react";
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

const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Lead Transfer" },
];

const formSchema = z.object({
  clientName: z.string(),
  currentSalesPerson: z.string().min(1, "Current sales person is required"),
  newSalesPerson: z.string().min(1, "New sales person is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

export default function LeadTransfer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchLeadData = async () => {
      try {
        // Mock data instead of API call
        const mockData = {
          clientName: "John Smith",
          salesPersonId: "alice",
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        form.reset({
          clientName: mockData.clientName,
          currentSalesPerson: mockData.salesPersonId,
          newSalesPerson: "",
          reason: "",
        });
      } catch (error) {
        console.error("Error fetching lead:", error);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLeadData();
    }
  }, [id, navigate, form]);

  const onSubmit = async (data) => {
    try {
      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Submitted data:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error transferring lead:", error);
    }
  };

  if (isLoading) {
    return (
      <HomeLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-lg">Loading...</div>
          </div>
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
                        <Input {...field} readOnly />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current sales person" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="alice">Alice Johnson</SelectItem>
                          <SelectItem value="bob">Bob Wilson</SelectItem>
                          <SelectItem value="carol">Carol Martinez</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <SelectItem value="david">David Thompson</SelectItem>
                          <SelectItem value="emma">Emma Rodriguez</SelectItem>
                          <SelectItem value="frank">Frank Chen</SelectItem>
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
