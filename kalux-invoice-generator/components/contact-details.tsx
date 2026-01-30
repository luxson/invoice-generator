import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { useInvoice } from "@/context/invoice-context";

export default function ContactDetails() {
    const {invoice, updateInvoice} = useInvoice();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Contact Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerFullame"> Fullname</Label>
          <Input id="customerFullame" placeholder="Hans Muster"
          value={invoice.toName}
          onChange={(e) => updateInvoice({toName: e.target.value})}></Input>
        </div>
        <div>
          <Label htmlFor="customerEmail">E-Mail</Label>
          <Input id="CustomerEmail" placeholder="your@email.com" type="email"
          value={invoice.toEmail}
           onChange={(e) => updateInvoice({toEmail: e.target.value})}></Input>
        </div>
        <div>
          <Label htmlFor="customerStreet">Street</Label>
          <Input id="CustomerStreet" placeholder="Musterstrasse" type="text"
          value={invoice.toAddress}
           onChange={(e) => updateInvoice({toAddress: e.target.value})}></Input>
        </div>
          <div>
          <Label htmlFor="customerStreetNR">No.</Label>
          <Input id="CustomerStreetNr" placeholder="1e" type="text"
          value={invoice.toStreetNr}
          onChange={(e) => updateInvoice({toStreetNr: e.target.value})}></Input>
        </div>
        <div>
          <Label htmlFor="customerPLZ">PLZ</Label>
          <Input id="CustomerPLZ" placeholder="8560" type="number" max={9999} min={1000}
          value={invoice.toPLZ}
           onChange={(e) => updateInvoice({toPLZ: e.target.value})}></Input>
        </div>
         <div>
          <Label htmlFor="customerLocation">Location</Label>
          <Input id="CustomerLocation" placeholder="Märstetten" type="text"
          value={invoice.ToLocation}
           onChange={(e) => updateInvoice({ToLocation: e.target.value})}></Input>
        </div>
      </CardContent>
    </Card>
  )
}
