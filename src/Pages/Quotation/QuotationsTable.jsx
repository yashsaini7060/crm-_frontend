import { useEffect, useState } from "react";
import HomeLayout from "@/Layout/HomeLayout";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import {
  getAllQuotations,
  deleteQuotation,
} from "@/redux/slices/quotationSlice";
import { use } from "react";

function QuotationsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotations, setQuotations] = useState();
  // const { quotations, loading, error } = useSelector(
  //   (state) => state.quotations
  // );
  useEffect(() => {
    setLoading(true);
    const response = dispatch(getAllQuotations());
    // console.log(response);
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    setQuotations(response);
  }, [dispatch]);

  const breadcrumbs = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Quotations" },
  ];

  // if (loading) {
  //   return (
  //     <HomeLayout breadcrumbs={breadcrumbs}>
  //       <div className="flex items-center justify-center min-h-[60vh]">
  //         <Loader2 className="h-8 w-8 animate-spin" />
  //       </div>
  //     </HomeLayout>
  //   );
  // }

  // if (error) {
  //   return (
  //     <HomeLayout breadcrumbs={breadcrumbs}>
  //       <div className="flex items-center justify-center min-h-[60vh]">
  //         <p className="text-destructive">
  //           {typeof error === "string"
  //             ? error
  //             : "An error occurred while fetching quotations"}
  //         </p>
  //       </div>
  //     </HomeLayout>
  //   );
  // }

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <div>QuotationsTable</div>
    </HomeLayout>
  );
}

export default QuotationsTable;
