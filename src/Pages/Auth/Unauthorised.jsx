import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "@/redux/slices/authSlice";

const Unauthorised = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Account Inactive</CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Your account is currently inactive. Please contact the administrator
            to get your account verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-500">
          <p>
            If you believe this is an error, please reach out to the system
            administrator for assistance.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorised;
