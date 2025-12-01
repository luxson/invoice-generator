import type { InvoiceData } from "@/types/invoice";
const now = new Date();

const pad = (n: number) => n.toString().padStart(2, "0");


//initial invoice data
export const initialInvoiceData: InvoiceData = {
    invoiceNumber:  "INV-" +
  now.getFullYear().toString() +
  pad(now.getMonth() + 1) +
  pad(now.getDate()) +
  pad(now.getHours()) +
  pad(now.getMinutes()) +
  pad(now.getSeconds()),
    date: now.toISOString().split('T')[0],
    fromName: "KaLux - Web & Software Solutions",
    fromAddress: "8560 Märstetten",
    fromEmail: "finanzen@kalux.ch",
    toName: "",
    toAddress: "",
    toStreetNr: "",
    toPLZ: "",
    toEmail: "",
    ToLocation: "",
    items: [{id: "1", description: "", mode: "quantity", quantity: 1, rate: 0, price: 0}],
    taxRate: 8.1,
    subtotal: 0,
    taxAmount: 0,
    total: 0,
}