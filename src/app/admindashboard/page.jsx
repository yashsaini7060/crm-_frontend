import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Header } from "@/components/ui/nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { month: "Jan", total: 1200 },
  { month: "Feb", total: 3000 },
  { month: "Mar", total: 3800 },
  { month: "Apr", total: 2200 },
  { month: "May", total: 5800 },
  { month: "Jun", total: 1800 },
  { month: "Jul", total: 3200 },
  { month: "Aug", total: 1900 },
  { month: "Sep", total: 2400 },
  { month: "Oct", total: 5000 },
  { month: "Nov", total: 2800 },
  { month: "Dec", total: 3000 },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              Jan 20, 2023 - Feb 09, 2023
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md">
              Download
            </button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar dataKey="total" fill="#000" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    You made 265 sales this month.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        name: "Olivia Martin",
                        email: "olivia.martin@email.com",
                        amount: "+$1,999.00",
                      },
                      {
                        name: "Jackson Lee",
                        email: "jackson.lee@email.com",
                        amount: "+$39.00",
                      },
                      {
                        name: "Isabella Nguyen",
                        email: "isabella.nguyen@email.com",
                        amount: "+$299.00",
                      },
                      {
                        name: "William Kim",
                        email: "will@email.com",
                        amount: "+$99.00",
                      },
                      {
                        name: "Sofia Davis",
                        email: "sofia.davis@email.com",
                        amount: "+$39.00",
                      },
                    ].map((sale, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/avatars/${index + 1}.png`}
                            alt="Avatar"
                          />
                          <AvatarFallback>{sale.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
