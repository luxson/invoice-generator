import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'

export default function TaxAndTotals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax And Totals</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input id="taxRate" type="number" min={0} max={100} step={0.01} defaultValue={8.1} />
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Subtotal:</span>
            <span>CHF 0.00</span>
          </div>
          <div className='flex justify-between'>
            <span>Tax (8.1%):</span>
            <span>CHF 0.00</span>
          </div>
            <div className='flex justify-between font-bold text-lg border-t pt-2'>
            <span>Total:</span>
            <span>CHF 0.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
