import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import { formatDate } from "./formatters";

type ImageType = "PNG" | "JPEG" | "WEBP";

async function fetchAsDataUrl(src: string): Promise<{ dataUrl: string; type: ImageType }> {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Image not found: ${src} (${res.status})`);

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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(invoice.fromName ?? "KaLux", leftX, topY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const senderLines = [
    "Software & Web Solutions",
    invoice.fromAddress,
  ].filter(Boolean);

  doc.text(senderLines, leftX, topY + 5, { lineHeightFactor: 1.2 });

  if (invoice.toName) {
    const recipientX = pageWidth - 70;
    const recipientY = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(invoice.toName, recipientX, recipientY);

    doc.setFont("helvetica", "normal");
    const recipientLines = [
      `${invoice.toAddress ?? ""} ${invoice.toStreetNr ?? ""}`.trim(),
      `${invoice.toPLZ ?? ""} ${invoice.ToLocation ?? ""}`.trim(),
    ].filter((v) => Boolean(v && v.trim().length > 0));

    doc.text(recipientLines, recipientX, recipientY + 5, { lineHeightFactor: 1.2 });
  }
}

export const generatePDF = async (invoice: InvoiceData) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  let y = 30;

  drawHeader(doc, invoice);

  const { dataUrl: logoDataUrl, type: logoType } = await fetchAsDataUrl("/kalux.png");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const logoW = 50;
  const logoH = 14;
  const logoX = pageWidth - 20 - logoW;
  const logoY = 12;

  doc.addImage(logoDataUrl, logoType, logoX, logoY, logoW, logoH);

  // Seite 1 Inhalt
  y = 100;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Rechnung", 20, y);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Rechnungsnummer: ${invoice.invoiceNumber}`, 20, y + 5);
  doc.text(`Datum: ${formatDate(invoice.date)}`, 20, y + 10);
  y += 20;



  // Text
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Sehr geehrte Damen und Herren`, 20, y + 5);
  doc.text(`Wir erlauben uns, die Rechnung für unsere Dienstleistung wie gefolgt zu stellen:`, 20, y + 15);
  y += 20;

  y += 5;

  // items header
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Rechnungsposten", 20, y);
  doc.text("Menge/Stunden", 80, y);
  doc.text("Einzelpreis", 125, y);
  doc.text("Gesamt", pageWidth - 40, y);
  y += 5;
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // items
  doc.setFont("helvetica", "normal");
  invoice.items.forEach((item) => {
    doc.text(item.description, 20, y);
    doc.text(String(item.quantity), 80, y);
    doc.text(`${item.rate.toFixed(2)} CHF`, 125, y);
    doc.text(`${item.price} CHF`, pageWidth - 40, y);
    y += 10;
  });

  y += 10;
  doc.line(140, y, 190, y);
  y += 10;

  doc.text(`Zwischensumme: ${invoice.subtotal.toFixed(2)} CHF`, pageWidth - 70, y);
  y += 8;
  doc.text(`MwSt. (${invoice.taxRate}%): ${invoice.taxAmount.toFixed(2)} CHF`, pageWidth - 70, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total: ${invoice.total.toFixed(2)} CHF`, pageWidth - 70, y);

   // Text
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Zahlungskonditionen:`, 20, y + 5);
  doc.text(`Zahlbar innert 10 Tagen`, 20, y + 15);
  y += 20;

  y += 5;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Wir bedanken uns für Ihren Auftrag und die angenehme Zusammenarbeit.
Für Rückfragen zur Rechnung stehen wir Ihnen gerne zur Verfügung.`, 20, y + 5);
y+= 5;
  doc.text(`Freundliche Grüsse`, 20, y + 15);
  doc.text(`Luxson Kanagarajah`, 20, y + 25);
  y += 20;

  y += 5;
  // Seite 2 mit Bild (rechnung.png)
  doc.addPage();

  const { dataUrl: rechnungDataUrl, type: rechnungType } = await fetchAsDataUrl("/rechnung.jpg");

  // Bild passend auf A4 skalieren (mit Rand)
  const rechnungx = 10;
  const rechnungy = 10;
  const maxW =   pageWidth - 20;

  const maxH = pageHeight / 3;

  // Wenn du exakte Proportionen willst, brauchst du die Bild-Aspect-Ratio.
  // Ohne extra Lib: wir füllen einfach maximal den Bereich aus.
  // (Für "contain" siehe Hinweis unten.)
  doc.addImage(rechnungDataUrl, rechnungType, rechnungx, rechnungy, maxW, maxH);

  // Generate blob URL for preview
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};
