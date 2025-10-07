
import { Suspense } from "react";
import AllProductClient from "./../../Components/allproductComponent";
import Loader from "../../Components/loader";

export default function AllProductPage() {
    return (
        <Suspense fallback={<><Loader /></>}>
            <AllProductClient />
        </Suspense>
    );
}