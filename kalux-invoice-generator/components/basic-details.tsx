import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { useInvoice } from "@/context/invoice-context"


export default function BasicDetails() {
  const {invoice, updateInvoice} = useInvoice();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber"> Invoice Number</Label>
          <Input id="invoiceNumber" 
          value={invoice.invoiceNumber} placeholder="KL-" prefix="KL-"
          onChange={(e) => updateInvoice({invoiceNumber: e.target.value })}
          ></Input>
        </div>
        <div>
          <Label htmlFor="invoiceDate">Date</Label>
          <Input id="invoiceDate" type="date" value={invoice.date}
           onChange={(e) => updateInvoice({date: e.target.value })}></Input>
        </div>
      </CardContent>
    </Card>
  )
}
