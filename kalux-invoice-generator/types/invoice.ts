type ItemMode = "quantity" | "hourly";

export interface InvoiceItem {
  id: string;
  description: string;
  mode: ItemMode;
  quantity?: number;    // used when mode = "quantity"
  hours?: number;       // used when mode = "hourly"
  rate: number;
  price: number;
}

export interface InvoiceData  {
    invoiceNumber: string
    date: string
    fromName: string
    fromAddress: string
    fromEmail: string
    toName: string
    toAddress: string
    toStreetNr: string
    toPLZ: string
    toEmail: string
    ToLocation: string
    items: InvoiceItem[]
    taxRate: number | string 
    subtotal: number
    taxAmount: number
    total: number
}