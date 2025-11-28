"use client";

import InvoiceForm from "@/components/invoice-form";
import InvoicePreview from "@/components/invoice-preview";
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react";
import { useState } from "react";

// client-based rendering
export default function Home() {
  //variable for showing preview-function
  const [showPreview, setShowPreview] = useState(false);

  if(showPreview){
    return <InvoicePreview/>;
  }
  return (
   <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-4xl mx-auto"> 
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* Titel */}
          <h1 className="text-2xl font-bold">KaLux - Invoice Generator</h1>
          {/* Description */}
          <p className="text-gray-600">Create professional invoices quickly </p>
        </div>
        <Button onClick={() => setShowPreview(true)}>
          <Eye className="w-4 h-4 mr-2"/>
          Invoice Preview
        </Button>
      </div>
      <InvoiceForm/>
    </div>
   </div>
  );
}
