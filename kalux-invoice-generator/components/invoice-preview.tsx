"use client";

import React, { use, useState } from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { InvoiceItem } from '@/types/invoice';
import { useInvoice } from '@/context/invoice-context';
import { formatDate } from './utils/formatters';
import { generatePDF } from './utils/pdf-generator';

//interface for props
interface InvoicePreviewProps {
  onBack: () => void;
}

export default function InvoicePreview( {onBack}: {onBack: () => InvoicePreviewProps}) {
  const {invoice} = useInvoice();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  //function to handle PDF download (placeholder)
  const handleDownloadPDF = async () => {
    // Placeholder for PDF generation logic
    const url = await generatePDF(invoice);
    setPdfUrl(url);
  }


  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className='text-2xl font-bold'>Invoice Preview</h1>
          <div className='space-x-2'>
            <Button variant="outline" onClick={onBack}>Back to Edit</Button>
            <Button onClick={handleDownloadPDF}>
              <Download  className='w-4 h-4 mr-2'/>
              Download PDF
              </Button>
          </div>
        </div>

        {
          pdfUrl && (
            <div className='mt-4 border rounded-lg overflow-hidden'>
              <iframe src={pdfUrl} width="100%" height="600px" />
            </div>
          )
        }

        <Card>
          <CardContent className='p-8'>
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className='text-3xl font-bold mb-2'>
                    Rechnung
                  </h2>
                  <p className='text-gray-600'>#{invoice.invoiceNumber}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600'>Datum: {formatDate(invoice.date)}</p>
                </div>
              </div>

              {/* From/TO */}
              <div className='grid grid-cols-2 gap-8 mb-8'>
                <div>
                  <h3 className='font-medium mb-2'>Von:</h3>
                  <p className='font-bold'>{invoice.fromName}</p>
                  <p className='text-gray-600'>{invoice.fromAddress}</p>
                  <p className='text-gray-600'>{invoice.fromEmail}</p>
                </div>
                <div>
                  <h3 className='font-medium mb-2'>An:</h3>
                  <p className='font-bold'>{invoice.toName}</p>
                  <p className='text-gray-600'>{invoice.toAddress} {invoice.toStreetNr}</p>
                  <p className='text-gray-600'>{invoice.toPLZ} {invoice.ToLocation}</p>
                </div>
              </div>

              {/* Invoice Items */}
              <table className='w-full mb-8'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left pb-2'>Beschreibung</th>
                    <th className='text-center pb-2'>Menge/Stunden</th>
                    <th className='text-right pb-2'>Preis</th>
                    <th className='text-right pb-2'>Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    invoice.items.map(item => (
                      <tr key={item.id} className='border-b'>
                        <td className='py-2'>{item.description}</td>
                        <td className='py-2 text-center'>
                          {item.mode === "quantity" ? item.quantity : item.hours}
                        </td>
                        <td className='py-2 text-right'>CHF { typeof item.rate === "number" ? item.rate.toFixed(2) : "0.00"}</td>
                        <td className='py-2 text-right'>CHF { typeof item.rate === "number" ? item.price.toFixed(2) : "0.00"}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Zwischensumme:</span>
                    <span>CHF {invoice.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MWST { typeof invoice.taxRate === "number" ? invoice.taxRate : 0}:</span>
                    <span>CHF {(invoice.taxAmount.toFixed(2))}</span>
                  </div>
                  <div className="flex justify-between font-bold  border-t pt-2 text-lg">
                    <span>Gesamt:</span>
                    <span>CHF {(invoice.total.toFixed(2))}</span>
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
