import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function InvoiceItem() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
        
        <div className="col-span-5">
            <Label>Description</Label>
            <Input placeholder="Item description"></Input>
        </div>
        <div className="col-span-2">
            <Label>Quantity/Hours</Label>
            <Input type="string" min={1}></Input>
        </div>
        <div className="col-span-2">
            <Label>Rate (CHF)</Label>
            <Input type="number" min={0} step={0.05} prefix="CHF"></Input>
        </div>
        <div className="col-span-2">
            <Label>Price (CHF)</Label>
            <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">CHF 0.00</div>
        </div>
        <div className="col-span-1 flex items-end">
            <Button     variant="outline" size="icon"  >
                <Trash2 className="w-4 h-4"/>
            </Button>
        </div>
    </div>
  )
}
