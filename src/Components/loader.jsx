import React from 'react'
import { Package, User, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, Truck, MapPin, Mail, Phone } from 'lucide-react';

export default function Loader() {
    return (
        <div className="min-h-screen  bg-white     h-screen overflow-hidden flex items-center justify-center">
            <div className="text-center">
                <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
                <p className="text-slate-600">Loading...</p>
            </div>
        </div>

    )
}
