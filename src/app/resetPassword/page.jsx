
import { Suspense } from "react";
import ResetPassword from "./../../Components/ResetPassword";
import Loader from "./../../Components/loader";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<><Loader /></>}>
      <ResetPassword />
    </Suspense>
  );
}