
import { Suspense } from "react";
import AllProductClient from "./../../Components/allproductComponent";

export default function AllProductPage() {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <AllProductClient />
        </Suspense>
    );
}