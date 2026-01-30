import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import { formatDate } from "./formatters";

type ImageType = "PNG" | "JPEG" | "WEBP";

async function fetchAsDataUrl(src: string): Promise<{ dataUrl: string; type: ImageType }> {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Logo not found: ${src} (${res.status})`);

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
        throw new Error(`Expected image/* but got ${contentType}`);
    }

    const type: ImageType =
        contentType.includes("png") ? "PNG" :
            contentType.includes("jpeg") || contentType.includes("jpg") ? "JPEG" :
                contentType.includes("webp") ? "WEBP" :
                    (() => { throw new Error(`Unsupported image type: ${contentType}`); })();

    const blob = await res.blob();

    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(blob);
    });

    return { dataUrl, type };
}

function drawHeader(doc: jsPDF, invoice: InvoiceData) {
    const pageWidth = doc.internal.pageSize.getWidth();

    const leftX = 20;
    const topY = 18;

    // Absender links oben
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(invoice.fromName ?? "KaLux", leftX, topY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const senderLines = [
        "Software & Web Solutions",          // z.B. "Software & Web Solutions"
        invoice.fromAddress,   // z.B. "8560 Märstetten"
    ].filter(Boolean);

    doc.text(senderLines, leftX, topY + 5, { lineHeightFactor: 1.2 });

    // Empfängerblock rechts (optional, wenn du ihn oben rechts willst)
    // Wenn du ihn erst weiter unten willst, lass diesen Teil weg
    if (invoice.toName) {
        const recipientX = pageWidth - 80; // Breite grob, anpassen
        const recipientY = 60;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(invoice.toName, recipientX, recipientY);

        doc.setFont("helvetica", "normal");
        const recipientLines = [
            `${invoice.toAddress} ${invoice.toStreetNr}`,
            `${invoice.toPLZ} ${invoice.ToLocation}`,
        ].filter(Boolean);

        doc.text(recipientLines, recipientX, recipientY + 5, { lineHeightFactor: 1.2 });
    }
}

export const generatePDF = async (invoice: InvoiceData) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    let y = 30;

    drawHeader(doc, invoice);

    const { dataUrl, type } = await fetchAsDataUrl("/kalux.png");

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoW = 40;
    const logoH = 14;
    const logoX = pageWidth - 20 - logoW;
    const logoY = 12;

    doc.addImage(dataUrl, type, logoX, logoY, logoW, logoH);

    // Ab hier dein restlicher Inhalt
    // Beispiel Start y
    y = 100;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Rechnung", 20, y);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Rechnungsnummer: ${invoice.invoiceNumber}`, 20, y + 5);
    doc.text(`Datum: ${formatDate(invoice.date)}`, 20, y + 10);
    y += 20;

    // Generate blob URL untunk preview
    const pdfBlob = doc.output('blob');
    return URL.createObjectURL(pdfBlob);
}