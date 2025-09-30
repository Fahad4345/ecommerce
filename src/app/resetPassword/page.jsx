
import { Suspense } from "react";
import ResetPassword from "./../../Components/ResetPassword";

export default function AllProductPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ResetPassword />
    </Suspense>
  );
}