import HomeLayout from "@/Layout/HomeLayout";
import { CalendarIcon, ArrowLeft } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { followUpClient, closeLead } from "../../redux/slices/clientSlice";
import { toast } from "react-hot-toast";

export default function UpdateStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      leadType: "hot",
      followUpStage: "initial",
      followUpType: "call",
      date: new Date(),
      time: "",
      remarks: "",
      closingReason: "",
      closingAmount: "",
      closingNotes: "",
      tabs: "schedule",
    },
    rules: {
      date: { required: true },
      time: { required: true },
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    const selectedTab = form.watch("tabs");
    console.log(selectedTab);
    // Retrieve clientId from local storage
    // const storedData = JSON.parse(localStorage.getItem("data"));
    const clientId = id;

    if (selectedTab === "schedule") {
      const scheduleData = {
        clientId,
        leadType: data.leadType,
        followUpStage: data.followUpStage,
        date: data.date,
        time: data.time,
        followUpType: data.followUpType,
        remarks: data.remarks,
      };
      console.log("Schedule Follow-Up Data:", scheduleData);
      handleFollowUp(scheduleData);
    } else if (selectedTab === "closing") {
      const closingData = {
        clientId,
        closingReason: data.closingReason,
        closingAmount: data.closingAmount,
        closingRemarks: data.closingNotes,
      };
      console.log("Lead Closing Data:", closingData);
      handleClosing(closingData);
    }
  };

  const handleFollowUp = async (followUpData) => {
    try {
      toast.loading("Sending follow-up data...");
      const result = await dispatch(followUpClient(followUpData)).unwrap();
      toast.dismiss();
      toast.success("Follow-up successful!");
      console.log("Follow-up successful:", result);
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send follow-up.");
      console.error("Failed to send follow-up:", error);
    }
  };
  const handleClosing = async (closingData) => {
    try {
      toast.loading("Sending closing data...");
      const result = await dispatch(closeLead(closingData)).unwrap();
      toast.dismiss();
      toast.success("Closed successful!");
      console.log("Closed successful:", result);
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send close.");
      console.error("Failed to send close:", error);
    }
  };

  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Update Status" },
  ];

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="mr-6">
              <CardTitle>Update Client Status</CardTitle>
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
          {/* <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Updating the client status will trigger a notification to the
              assigned sales person.
            </AlertDescription>
          </Alert> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="leadType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Hot" id="hot" />
                            <label
                              htmlFor="Hot"
                              className="rounded-full px-3 py-1 bg-red-100 text-red-700 text-sm"
                            >
                              Hot
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Warm" id="warm" />
                            <label
                              htmlFor="Warm"
                              className="rounded-full px-3 py-1 bg-yellow-100 text-yellow-700 text-sm"
                            >
                              Warm
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Cold" id="cold" />
                            <label
                              htmlFor="Cold"
                              className="rounded-full px-3 py-1 bg-blue-100 text-blue-700 text-sm"
                            >
                              Cold
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="followUpStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Follow Up Stage</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Initial Contact"
                              id="initial"
                            />
                            <label htmlFor="initial">Initial Contact</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Proposal" id="proposal" />
                            <label htmlFor="proposal">Proposal</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Negotiation"
                              id="negotiation"
                            />
                            <label htmlFor="negotiation">Negotiation</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Closed Won"
                              id="closed-won"
                            />
                            <label htmlFor="closed-won">Closed Won</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Closed Lost"
                              id="closed-lost"
                            />
                            <label htmlFor="closed-lost">Closed Lost</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Tabs
                defaultValue="schedule"
                className="w-full"
                onValueChange={(value) => form.setValue("tabs", value)}
              >
                <TabsList className="sm:grid w-full grid-cols-2 gap-2 ">
                  <TabsTrigger value="schedule">Schedule Follow Up</TabsTrigger>
                  <TabsTrigger value="closing">Lead Closing</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"ghost"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      rules={{ required: "Time is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Time
                          </FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input
                                type="time"
                                {...field}
                                className="w-full border-none justify-center"
                                required
                              />
                              {/* <Button
                                variant="outline"
                                size="icon"
                                type="button"
                                className="ml-2"
                              >
                                <Clock className="h-4 w-4" />
                              </Button> */}
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="followUpType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow Up Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select follow up type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="site-visit">
                              Site Visit
                            </SelectItem>
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
                            placeholder="Enter any additional remarks for the follow up"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="closing" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="closingReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Reason</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select closing reason" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="deal-won">Deal Won</SelectItem>
                            <SelectItem value="budget-constraints">
                              Budget Constraints
                            </SelectItem>
                            <SelectItem value="competitor-selected">
                              Competitor Selected
                            </SelectItem>
                            <SelectItem value="no-response">
                              No Response
                            </SelectItem>
                            <SelectItem value="not-interested">
                              Not Interested
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closingAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter closing amount"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closingNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter any additional notes about the lead closing..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button type="submit">
                  Update Status & Schedule Follow Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </HomeLayout>
  );
}
