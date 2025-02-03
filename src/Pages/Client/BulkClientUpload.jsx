import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import HomeLayout from "@/Layout/HomeLayout";
const breadcrumbs = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Bulk Client Upload" },
];
export default function BulkClientUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload here
    if (file) {
      // Simulating upload process
      setTimeout(() => {
        setUploadStatus("success");
        // In a real application, you would process the file here
        console.log("File uploaded:", file.name);
      }, 2000);
    }
  };

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Bulk Client Upload
          </h1>
          <Link to="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl flex items-center">
              <FileSpreadsheet className="mr-2 h-6 w-6 text-primary" />
              Upload Excel Sheet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="excelFile">Select Excel File</Label>
                <Input
                  id="excelFile"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={!file}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Clients
              </Button>
            </form>

            {uploadStatus === "success" && (
              <Alert className="mt-4 bg-green-50 text-green-800 border-green-300">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your client data has been successfully uploaded and processed.
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "error" && (
              <Alert className="mt-4 bg-red-50 text-red-800 border-red-300">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>
                  There was an error uploading your client data. Please try
                  again.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Prepare your Excel sheet with the following columns:
                <ul className="list-disc list-inside ml-4">
                  <li>Name</li>
                  <li>Email</li>
                  <li>Mobile</li>
                  <li>Company Name</li>
                  <li>Query</li>
                  <li>Lead Type</li>
                  <li>Sales Person</li>
                  <li>Reference Type</li>
                </ul>
              </li>
              <li>Ensure all required fields are filled in the Excel sheet.</li>
              <li>Save your Excel file in .xlsx or .xls format.</li>
              <li>
                Click on &apos;Choose File&apos; and select your prepared Excel
                file.
              </li>
              <li>Click on &apos;Upload Clients&apos; to process the file.</li>
              <li>
                Wait for the confirmation message before closing the page.
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}
