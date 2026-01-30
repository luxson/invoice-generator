import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

import type { InvoiceItem as InvoiceItemsType } from "@/types/invoice";
import { useInvoice } from "@/context/invoice-context";

interface InvoiceItemsProps {
    item: InvoiceItemsType;
    index: number;
    canRemove: boolean;
}

export default function InvoiceItem({
    item,
    index,
    canRemove
}: InvoiceItemsProps) {

    const { removeItem, updateItem } = useInvoice();

    const handleQuantityChange = (value: string) => {
        // Allow empty string temporarily but canovert to number for calculations
        if (value === "") {
            updateItem(index, "quantity", "");
        } else {
            const numericValue = Number.parseInt(value);
            if (!isNaN(numericValue) && numericValue >= 0) {
                updateItem(index, "quantity", numericValue);
            }  
        }
    }

    const handleQuantityBlur = () => {
        // On blur, if the quantity is empty, set it to 1
        if (item.quantity === "" || item.quantity === 0) {
            updateItem(index, "quantity", 1);
        }
    }

     const handleRateChange = (value: string) => {
        // Allow empty string temporarily but canovert to number for calculations
        if (value === "") {
            updateItem(index, "rate", "");
        } else {
            const numericValue = Number.parseFloat(value);
            if (!isNaN(numericValue) && numericValue >= 0) {
                updateItem(index, "rate", numericValue);
            }  
        }
    }

    const handleRateBlur = () => {
        // On blur, if the quantity is empty, set it to 1
        if (item.rate === "" || item.rate === 0) {
            updateItem(index, "rate", 0);
        }
    }

    return (
        <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg">

            <div className="col-span-5">
                <Label>Description</Label>
                <Input placeholder="Item description"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}></Input>
            </div>
            <div className="col-span-2">
                <Label>Quantity/Hourly</Label>
                <Input type="string" min={1}
                    value={item.quantity}
                    // onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    onBlur={handleQuantityBlur}
                ></Input>
            </div>
            <div className="col-span-2">
                <Label>Rate (CHF)</Label>
                <Input type="number" min={0} step={0.05} prefix="CHF"
                    value={item.rate}
                    onChange={(e) => handleRateChange(e.target.value)}
                    onBlur={handleRateBlur}></Input>
            </div>
            <div className="col-span-2">
                <Label>Price (CHF)</Label>
                <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">
                    CHF {typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                    {/* CHF {(item.rate * (item.quantity || 0)).toFixed(2)} */}
                </div>
            </div>
            <div className="col-span-1 flex items-end">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={!canRemove}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
