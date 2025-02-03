import { Routes, Route } from "react-router";
import RequireAuth from "./components/Auth/RequireAuth";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/dashboard/page";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import AddNewClient from "./Pages/Client/AddNewClient";
import ViewDetails from "./Pages/Client/ViewDetails";
import UpdateStatus from "./Pages/Client/UpdateStatus";
import BulkClientUpload from "./Pages/Client/BulkClientUpload";
import LeadTransfer from "./Pages/Client/LeadTransfer";
import Reports from "./Pages/Reports/page";
import Quotation from "./Pages/Client/Quotation";
// import AddSalesPerson from "./Pages/Client/AddSalesPerson";
import Logout from "./Pages/Auth/Logout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          element={
            <RequireAuth allowedRoles={["admin", "user", "superadmin"]} />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-new-client" element={<AddNewClient />} />
          <Route path="/bulk-client-upload" element={<BulkClientUpload />} />
          <Route path="/lead-transfer/:id" element={<LeadTransfer />} />
          <Route path="/client/view/:id" element={<ViewDetails />} />
          <Route path="/client/update-status/:id" element={<UpdateStatus />} />
          <Route path="/quotation/:id" element={<Quotation />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        {/* <Route path="/" element={<Dashboard />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
