import { useState } from "react";
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
} from "lucide-react";
import AddProductDialog from "./AddProductDialog";
import HomeLayout from "@/Layout/HomeLayout";
let quotationData = {
  clientAddress: "123 Business District, Corporate Tower 4th Floor, Suite 405",
  deliveryAddress: "456 Industrial Zone, Warehouse Complex B, Dock 7",
  clientName: "TechCorp Solutions Ltd.",
  clientMobile: "+1 (555) 123-4567",
  salesPerson: "Sarah Johnson",
  orderNo: "QT-2024-001",
};

export default function Quotation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  console.log(products);
  const handleAddProduct = (data) => {
    setProducts([...products, { ...data, unitType: "Box" }]);
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubTotal=(newamount)=>{
    setSubTotal( subTotal + newamount  )
  }



  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Quotation" },
  ];
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto py-8 max-w-5xl">
          <div className="bg-white rounded-lg shadow-sm border p-2 space-y-2">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {quotationData.clientAddress}
                  </p>
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {quotationData.deliveryAddress}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <div>
                  <span className="font-medium">Order No:</span>
                  <Badge className={"px-2"} variant="outline">{quotationData.orderNo}</Badge>

                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Client Name:</span>
                  <span className="text-muted-foreground">
                    {quotationData.clientName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">Client Mobile:</span>
                  <span className="text-muted-foreground">
                    {quotationData.clientMobile}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium">Sales Person:</span>
                  <span className="text-muted-foreground">
                    {quotationData.salesPerson}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span className="font-medium">Order Date:</span>
                  <span className="text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Products</h2>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
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
                            <TableCell>{index+1}</TableCell>
                            <TableCell className="font-medium">
                              {product.productName}
                            </TableCell>
                            <TableCell>{product.size}</TableCell>
                            <TableCell>{product.hsnNo}</TableCell>
                            <TableCell>{product.gst}</TableCell>
                            <TableCell>{product.qty}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{( product.qty * product.price)}</TableCell>
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
              <Card className="flex justify-end ">
                <CardContent className=" ">
                  <Table >
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold bottom-0">Sub Total</TableCell>
                        <TableCell className="px-20"> 
                          {products.reduce((total, product) => total + parseInt(product.qty * product.price), 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Frieght Charges</TableCell>
                        <TableCell className="px-20">1000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Cutting Charges</TableCell>
                        <TableCell className="px-20">1000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Tax (GST)</TableCell>
                        <TableCell className="px-20">
                          {products.reduce((total, product) => total + parseInt((product.qty * product.price)*product.gst/100  ), 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold">Grand Total</TableCell>
                        <TableCell className="px-20">
                        { products.reduce((total, product) => total + ( ( product.qty * product.price )*product.gst/100 )+( product.qty*product.price )  , 0)}
                        </TableCell>
                      </TableRow>
                    </TableBody>

                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Submit Quotation</Button>
            </div>
          </div>
        </div>

        <AddProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddProduct={handleAddProduct}
        />
      </div>
    </HomeLayout>
  );
}
