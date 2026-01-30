import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { useInvoice } from '@/context/invoice-context';

export default function TaxAndTotals() {
  const { invoice, updateInvoice } = useInvoice();

  const handleTaxRateChange = (value: string) => {
    // Allow empty string temporarily but canovert to number for calculations
    if (value === "") {
      updateInvoice({ taxRate: "" });
    } else {
      const numericValue = Number.parseFloat(value);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
        updateInvoice({ taxRate: numericValue });
      }
    }
  }

  const handleTaxRateBlur = () => {
    // On blur, if the quantity is empty, set it to 1
    if (invoice.taxRate === "" || isNaN(Number(invoice.taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax And Totals</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input id="taxRate" type="number" min={0} max={100} step={0.01} defaultValue={8.1}
            onChange={(e) => handleTaxRateChange(e.target.value)}
            value={invoice.taxRate}
            onBlur={handleTaxRateBlur} />
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Subtotal:</span>
            <span>CHF {invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Tax ({typeof invoice.taxRate === "number" ? invoice.taxRate : 0}%):</span>
            <span>CHF {invoice.taxAmount.toFixed(2) }</span>
          </div>
          <div className='flex justify-between font-bold text-lg border-t pt-2'>
            <span>Total:</span>
            <span>CHF {invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
