import type { InvoiceItem } from "@/types/invoice";

export const calculateTotals = (items: InvoiceItem[], taxRate: number) => {
    const subtotal = items.reduce( (sum, item) => {
        const amount = typeof item.price === "number" ? item.price : 0;
        return sum + amount;
    }, 0);  
    const rate = typeof taxRate === "number" ? taxRate : taxRate ===""? 0: Number(taxRate)
    const taxAmount = (subtotal * rate) / 100;
    const total = subtotal + taxAmount;
    return { subTotal: subtotal, taxAmount, total };
}

