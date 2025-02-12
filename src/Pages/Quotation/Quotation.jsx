import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { getClientDetails } from "@/redux/slices/clientSlice";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Building2,
  Phone,
  User,
  Plus,
  X,
  ClipboardList,
  Loader2,
} from "lucide-react";
import AddProductDialog from "./AddProductDialog";
import AddChargesDialog from "./AddChargesDialog";
import HomeLayout from "@/Layout/HomeLayout";
import { createQuotation } from "@/redux/slices/quotationSlice";

export default function Quotation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const [isError, setIsError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChargesDialogOpen, setIsChargesDialogOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [charges, setCharges] = useState({
    freight: 0,
    cutting: 0,
  });

  // Generate order number once when component mounts
  const generateOrderNo = () =>
    `QT-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

  const [clientData, setClientData] = useState({
    clientAddress: "",
    deliveryAddress: "",
    clientName: "",
    clientMobile: "",
    salesPerson: "",
    orderNo: generateOrderNo(),
    companyName: "",
  });

  const handleAddProduct = (data) => {
    setProducts([...products, { ...data, unitType: "Box" }]);
  };

  const handelCharges = (data) => {
    console.log(data);
    setCharges({
      payment: data.paymentStatus || "Cash",
      freight: parseInt(data.freight),
      cutting: parseInt(data.cutting),
    });
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };
  const maxGst =
    products.length > 0
      ? Math.max(...products.map((product) => product.gst))
      : 0;

  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Quotation" },
  ];

  const handleAddressChange = (type, value) => {
    setClientData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await dispatch(getClientDetails(id)).unwrap();
        console.log(response);

        if (response) {
          setClientData((prevData) => ({
            ...prevData, // Keep existing data including orderNo
            clientAddress: response.shippingAddress || "",
            deliveryAddress: response.deliveryAddress || "",
            clientName: response.name || "",
            clientMobile: response.mobile || "",
            salesPerson: response.salesPerson?.name || "",
            companyName: response.companyName || "",
          }));

          form.reset({
            clientName: response.name,
            currentSalesPerson: response.salesPerson?._id || "",
            newSalesPerson: "",
            reason: "",
          });
        }
      } catch (error) {
        console.error("Error fetching lead:", error);
        toast.error("Failed to fetch client details");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadData();
  }, [id, dispatch, form, navigate]);

  const handleSubmitQuotation = async () => {
    try {
      setIsLoading(true);

      const formattedProducts = products.map((product, index) => ({
        sno: index + 1,
        productName: product.productName,
        size: product.size,
        hsnNo: product.hsnNo,
        gstPercentage: product.gst,
        quantity: parseInt(product.qty),
        price: parseFloat(product.price),
        total: product.qty * product.price,
      }));

      const totalAmount =
        products.reduce(
          (total, product) =>
            total +
            (product.qty * product.price * product.gst) / 100 +
            product.qty * product.price,
          0
        ) +
        charges.freight +
        charges.freight * (maxGst / 100) +
        charges.cutting +
        charges.cutting * (maxGst / 100);

      const quotationData = {
        client: id, // client ID from params
        products: formattedProducts,
        cuttingCharges: charges.cutting,
        freightCharges: charges.freight,
        totalAmount,
        status: "Draft",
      };

      await dispatch(createQuotation(quotationData)).unwrap();
      toast.success("Quotation created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to create quotation");
      setIsError(true);
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
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto py-8 max-w-5xl">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                New Quotation
              </h1>
              {/* <p className="text-muted-foreground">
                Create a new quotation for your client
              </p> */}
            </div>
            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-none bg-muted/50">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg font-medium">
                    Client Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={clientData.clientAddress}
                    onChange={(e) =>
                      handleAddressChange("clientAddress", e.target.value)
                    }
                    className="w-full min-h-[100px] p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter client address..."
                  />
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/50">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg font-medium">
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={clientData.deliveryAddress}
                    onChange={(e) =>
                      handleAddressChange("deliveryAddress", e.target.value)
                    }
                    className="w-full min-h-[100px] p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter delivery address..."
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span className="font-medium">Order No:</span>
                  <Badge variant="outline">{clientData.orderNo}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Client Name:</span>
                  <span className="text-muted-foreground">
                    {clientData.clientName} - {clientData.companyName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">Client Mobile:</span>
                  <span className="text-muted-foreground">
                    {clientData.clientMobile}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium">Sales Person:</span>
                  <span className="text-muted-foreground">
                    {clientData.salesPerson}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span className="font-medium">Order Date:</span>
                  <span className="text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span className="font-medium">Payment Status:</span>
                  <span className="text-muted-foreground">
                    {charges.payment}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Products</h2>
                <div>
                  <Button
                    onClick={() => setIsChargesDialogOpen(true)}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    Charges & Payments
                  </Button>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="outline"
                    size="sm"
                    className="h-8 ml-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>S No</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Hsn No</TableHead>
                        <TableHead>GST %</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center text-muted-foreground"
                          >
                            No products added yet. Click the button above to add
                            products.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {product.productName}
                            </TableCell>
                            <TableCell>{product.size}</TableCell>
                            <TableCell>{product.hsnNo}</TableCell>
                            <TableCell>{product.gst}</TableCell>
                            <TableCell>{product.qty}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.qty * product.price}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveProduct(index)}
                                className="h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="flex justify-end">
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold bottom-0">
                          Sub Total
                        </TableCell>
                        <TableCell className="px-20">
                          {products.reduce(
                            (total, product) =>
                              total + parseInt(product.qty * product.price),
                            0
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Frieght Charges
                        </TableCell>
                        <TableCell className="px-20">
                          {charges.freight + charges.freight * (maxGst / 100)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Cutting Charges
                        </TableCell>
                        <TableCell className="px-20">
                          {charges.cutting + charges.cutting * (maxGst / 100)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Tax (GST)
                        </TableCell>
                        <TableCell className="px-20">
                          {products.reduce(
                            (total, product) =>
                              total +
                              parseInt(
                                (product.qty * product.price * product.gst) /
                                  100
                              ),
                            0
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Grand Total</TableCell>
                        <TableCell className="px-20">
                          {products.reduce(
                            (total, product) =>
                              total +
                              (product.qty * product.price * product.gst) /
                                100 +
                              product.qty * product.price,
                            0
                          ) +
                            charges.freight +
                            charges.freight * (maxGst / 100) +
                            charges.cutting +
                            charges.cutting * (maxGst / 100)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button onClick={handleSubmitQuotation} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Quotation"
                )}
              </Button>
            </div>
          </div>
        </div>

        <AddProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddProduct={handleAddProduct}
        />
        <AddChargesDialog
          open={isChargesDialogOpen}
          onOpenChange={setIsChargesDialogOpen}
          onAddProduct={handelCharges}
        />
      </div>
    </HomeLayout>
  );
}
