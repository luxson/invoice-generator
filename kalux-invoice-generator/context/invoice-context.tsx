"use client";

import { calculateTotals } from "@/components/utils/calculations";
import { initialInvoiceData } from "@/lib/constants";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { createContext, ReactNode, useContext, useState } from "react";

interface IvoiceContextType {
    invoice: InvoiceData;
    updateInvoice: (updates: Partial<InvoiceData>) => void;
    addItem: () => void;
    removeItem: (index: number) => void;
    updateItem: (index: number, field: keyof InvoiceItem, value: string | number) => void;
}

const InvoiceContext = createContext<IvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {

    const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);

    const updateInvoice = (updates: Partial<InvoiceData>) => {
        const newInvoice = { ...invoice, ...updates };

        if(updates.items || updates.taxRate !== undefined) {
            const {subTotal, taxAmount, total} = calculateTotals(
                updates.items || invoice.items,
                updates.taxRate !== undefined ? updates.taxRate : invoice.taxRate
            );
            newInvoice.subtotal = subTotal;
            newInvoice.taxAmount = taxAmount;
            newInvoice.total = total;
        }
        setInvoice(newInvoice);
    };


    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");

    // Function to add a new item to the invoice
    const addItem = () => {
        const newItem: InvoiceItem = {
            id: "INVItem-" +
                now.getFullYear().toString() +
                pad(now.getMonth() + 1) +
                pad(now.getDate()) +
                pad(now.getHours()) +
                pad(now.getMinutes()) +
                pad(now.getSeconds()),
            description: "",
            mode: "quantity", // hourly or quantity
            quantity: 1, // used when mode = "quantity"
            hours: 0,    // used when mode = "hourly"
            rate: 0,
            price: 0,

        };

        updateInvoice({ items: [...invoice.items, newItem] });
    }


    const removeItem = (index: number) => {
        if (invoice.items.length > 1) {
            const newItems = invoice.items.filter((_, i) => i !== index);
            updateInvoice({ items: newItems });
        }
    }

    const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...invoice.items];
        newItems[index] = { ...newItems[index], [field]: value };

        if (field === "quantity" || field === "hours" || field === "rate") {
            const quantityVal = newItems[index].quantity;
            const rateVal = newItems[index].rate;

            let quantity: number;
            if (typeof quantityVal === "string") {
                quantity = quantityVal === "" ? 0 : Number(quantityVal);
            } else {
                quantity = quantityVal;
            }

            let rate: number;
            if (typeof rateVal === "string") {
                rate = rateVal === "" ? 0 : Number(quantityVal);
            } else {
                rate = rateVal;
            }

            newItems[index].price = quantity * rate;
        }
        console.log(newItems);
        updateInvoice({ items: newItems });

    }
    return (
        <InvoiceContext.Provider value={{ invoice, updateInvoice, addItem, removeItem, updateItem }}>
            {children}
        </InvoiceContext.Provider>
    );

}

export function useInvoice() {
    const context = useContext(InvoiceContext);
    if (context === undefined) {
        throw new Error("useInvoice must be used within an InvoiceProvider");
    }
    return context;
}