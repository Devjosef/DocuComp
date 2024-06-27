import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const exportToPDF = async (doc: PDFDocument) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const documentContent = "Your text or dynamic content here"; // Define documentContent
    page.drawText(documentContent, { x: 50, y: height - 4 * fontSize, size: fontSize });
    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: 'application/pdf'}), 'document.pdf');
};