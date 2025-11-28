import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"


export default function BasicDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber"> Invoice Number</Label>
          <Input id="invoiceNumber" placeholder="KL-" prefix="KL-"></Input>
        </div>
        <div>
          <Label htmlFor="invoiceDate">Date</Label>
          <Input id="invoiceDate" type="date"></Input>
        </div>
      </CardContent>
    </Card>
  )
}
