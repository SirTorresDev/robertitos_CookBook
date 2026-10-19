import { jsPDF } from 'jspdf';
import fs from 'fs';

const brandContent = fs.readFileSync('./src/constants/brandAssets.ts', 'utf8');
const emblem = brandContent.match(/BRAND_EMBLEM_BASE64 = '([^']+)'/)[1];
const wordmark = brandContent.match(/BRAND_WORDMARK_BASE64 = '([^']+)'/)[1];

function formatAmount(amount) {
  if (Number.isInteger(amount)) return String(amount);
  return String(Math.round(amount * 100) / 100).replace('.', ',');
}

function formatTimerLabel(seconds) {
  if (!seconds || seconds <= 0) return '';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  if (mins > 0) return `${mins} min${secs > 0 ? ` ${secs}s` : ''}`;
  return `${secs}s`;
}

function generateVectorPdf(recipe, targetServings, imageBase64) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const scaleFactor = targetServings / (recipe.baseServings || 1);

  // 1. Page Background: Cream (#FAF7F0)
  doc.setFillColor(250, 247, 240);
  doc.rect(0, 0, 210, 297, 'F');

  // 2. Main Card Frame
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 214, 193);
  doc.setLineWidth(0.4);
  doc.roundedRect(8, 8, 194, 281, 3, 3, 'FD');

  // 3. Brand Header: Centered Logo on Cream (#FAF7F0) + Golden Line (#D4912A)
  doc.setFillColor(250, 247, 240);
  doc.rect(8.2, 8.2, 193.6, 14.8, 'F');
  doc.setFillColor(212, 145, 42);
  doc.rect(8, 23.0, 194, 0.7, 'F');

  try {
    // Emblem (320x253 -> w: 12.0mm, h: 9.5mm)
    // Wordmark (519x180 -> w: 25.1mm, h: 8.7mm)
    // Total width = 39.6mm. Centered at x = 105mm -> startX = 85.2mm
    doc.addImage(emblem, 'WEBP', 85.2, 10.8, 12.0, 9.5);
    doc.addImage(wordmark, 'WEBP', 99.7, 11.2, 25.1, 8.7);
  } catch (err) {
    doc.setTextColor(24, 21, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("ROBERTITO'S COOKBOOK", 105, 17, { align: 'center' });
  }

  let currentY = 23.7;

  // 4. Hero Section: Aspect-ratio preserved image with dark gradient & integrated serif title
  const isHighDensity = (recipe.steps?.length || 0) > 6 || (recipe.ingredients?.length || 0) > 10;
  const heroHeightMm = isHighDensity ? 54 : 64;

  if (imageBase64 && typeof imageBase64 === 'string' && imageBase64.length > 50) {
    try {
      const format = imageBase64.includes('image/webp') ? 'WEBP' : (imageBase64.includes('image/png') ? 'PNG' : 'JPEG');
      doc.addImage(imageBase64, format, 8, currentY, 194, heroHeightMm);
    } catch (e) {
      doc.setFillColor(24, 21, 18);
      doc.rect(8, currentY, 194, heroHeightMm, 'F');
    }
  } else {
    doc.setFillColor(24, 21, 18);
    doc.rect(8, currentY, 194, heroHeightMm, 'F');
  }

  // Integrated Title (Serif) & Subtitle over the Hero Image Gradient
  const titleText = recipe.title || 'Receta';
  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  const titleLines = doc.splitTextToSize(titleText, 178);

  const subtitleText = recipe.subtitle || '';
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const subtitleLines = subtitleText ? doc.splitTextToSize(subtitleText, 178) : [];

  const subY = currentY + heroHeightMm - 5.2;
  const titleY = subtitleLines.length > 0
    ? subY - (subtitleLines.length * 3.4) - (titleLines.length * 5.8) + 2.5
    : currentY + heroHeightMm - 6.0;

  doc.setFont('times', 'bold');
  doc.setFontSize(titleLines.length > 1 ? 14.5 : 17);
  doc.setTextColor(255, 255, 255);
  doc.text(titleLines, 14, titleY);

  if (subtitleLines.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(245, 240, 230);
    doc.text(subtitleLines, 14, subY);
  }

  currentY += heroHeightMm;

  // 5. Metrics Strip (High Contrast Charcoal #181512 with Golden Dots #D4912A)
  doc.setFillColor(24, 21, 18);
  doc.rect(8, currentY, 194, 7.8, 'F');
  doc.setDrawColor(226, 214, 193);
  doc.setLineWidth(0.3);
  doc.line(8, currentY + 7.8, 202, currentY + 7.8);

  // Vertical subtle dividers
  doc.setDrawColor(55, 48, 40);
  doc.line(72, currentY + 1.5, 72, currentY + 6.3);
  doc.line(138, currentY + 1.5, 138, currentY + 6.3);

  // Cell 1: Raciones
  doc.setFillColor(212, 145, 42);
  doc.circle(20, currentY + 3.9, 0.9, 'F');
  doc.setTextColor(200, 190, 175);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('RACIONES', 24, currentY + 5.0);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text(`${targetServings} pax`, 48, currentY + 5.0);

  // Cell 2: Tiempo Total
  doc.setFillColor(212, 145, 42);
  doc.circle(85, currentY + 3.9, 0.9, 'F');
  doc.setTextColor(200, 190, 175);
  doc.setFontSize(6.8);
  doc.text('TIEMPO TOTAL', 89, currentY + 5.0);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text(`${recipe.prepTimeMinutes || 0} min`, 119, currentY + 5.0);

  // Cell 3: Nivel Técnico
  doc.setFillColor(212, 145, 42);
  doc.circle(150, currentY + 3.9, 0.9, 'F');
  doc.setTextColor(200, 190, 175);
  doc.setFontSize(6.8);
  doc.text('NIVEL TECNICO', 154, currentY + 5.0);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text(recipe.difficulty || 'Media', 182, currentY + 5.0);

  currentY += 10.5;

  // 6. Chef Note & Pairing
  if (recipe.chefNote) {
    const hasPairing = !!recipe.pairing;
    const boxHeight = hasPairing ? 15 : 10.5;
    doc.setFillColor(255, 249, 237);
    doc.roundedRect(12, currentY, 186, boxHeight, 1.5, 1.5, 'F');
    doc.setFillColor(212, 145, 42);
    doc.rect(12, currentY, 2.5, boxHeight, 'F');

    doc.setTextColor(200, 75, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.text('* CLAVE DEL CHEF:', 17, currentY + 4.5);

    doc.setTextColor(56, 43, 27);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    const noteLines = doc.splitTextToSize(recipe.chefNote, 138);
    doc.text(noteLines, 48, currentY + 4.5);

    if (hasPairing) {
      doc.setTextColor(212, 145, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text('MARIDAJE:', 17, currentY + 11.2);
      doc.setTextColor(56, 43, 27);
      doc.setFont('helvetica', 'normal');
      doc.text(recipe.pairing, 35, currentY + 11.2);
    }

    currentY += boxHeight + 3.5;
  }

  // 7. Two Columns (Ingredientes + Elaboración)
  const contentTopY = currentY + 2;
  const colDividerX = 76;

  // Left: Ingredientes
  doc.setTextColor(24, 21, 18);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Ingredientes', 12, contentTopY);

  doc.setTextColor(184, 107, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.text(`${targetServings} pax`, colDividerX - 4, contentTopY, { align: 'right' });

  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(12, contentTopY + 2, colDividerX - 4, contentTopY + 2);

  let ingY = contentTopY + 7;
  (recipe.ingredients || []).forEach((ing) => {
    if (ingY > 275) return;
    doc.setFillColor(212, 145, 42);
    doc.circle(14, ingY - 0.7, 0.65, 'F');

    doc.setTextColor(24, 21, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);

    const scaledAmount = Math.round(ing.amount * scaleFactor * 100) / 100;
    const qtyStr = `${formatAmount(scaledAmount)} ${ing.unit || ''}`.trim();

    const nameText = `${ing.name}${ing.notes ? ` · ${ing.notes}` : ''}`;
    const nameLines = doc.splitTextToSize(nameText, 39);
    doc.text(nameLines, 17, ingY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(184, 107, 17);
    doc.text(qtyStr, colDividerX - 4, ingY, { align: 'right' });

    ingY += Math.max(nameLines.length * 3.6, 5.2);
  });

  // Right: Elaboración Paso a Paso
  doc.setTextColor(24, 21, 18);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Elaboracion Paso a Paso', colDividerX + 4, contentTopY);

  doc.setTextColor(184, 107, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.text(`${(recipe.steps || []).length} pasos`, 198, contentTopY, { align: 'right' });

  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(colDividerX + 4, contentTopY + 2, 198, contentTopY + 2);

  let stepY = contentTopY + 7;
  (recipe.steps || []).forEach((st) => {
    if (stepY > 274) return;

    doc.setFillColor(24, 21, 18);
    doc.circle(colDividerX + 7, stepY - 0.8, 2.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.text(String(st.stepNumber), colDividerX + 7, stepY, { align: 'center' });

    doc.setTextColor(24, 21, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    let titleStr = st.title;
    if (st.temperature) titleStr += ` [${st.temperature}]`;
    if (st.timerSeconds) titleStr += ` (${formatTimerLabel(st.timerSeconds)})`;
    doc.text(titleStr, colDividerX + 11.5, stepY);

    doc.setTextColor(56, 43, 27);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const descLines = doc.splitTextToSize(st.instruction, 110);
    doc.text(descLines, colDividerX + 11.5, stepY + 3.6);

    stepY += 4.2 + descLines.length * 3.2;

    if (st.tip && stepY < 274) {
      doc.setTextColor(184, 107, 17);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.5);
      const tipLines = doc.splitTextToSize(`* Matiz tecnico: ${st.tip}`, 108);
      doc.text(tipLines, colDividerX + 11.5, stepY);
      stepY += tipLines.length * 3.0 + 2.0;
    } else {
      stepY += 2.0;
    }
  });

  doc.setDrawColor(226, 214, 193);
  doc.setLineWidth(0.3);
  doc.line(colDividerX, contentTopY - 2, colDividerX, Math.max(ingY, stepY, 281));

  // 8. Footer
  doc.setFillColor(24, 21, 18);
  doc.rect(8, 282, 194, 7, 'F');
  doc.setTextColor(212, 145, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Robertito's CookBook · Alta Cocina y Precision", 14, 286.5);
  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.text(`Escala aplicada: ${targetServings} pax · Ficha Tecnica Oficial`, 196, 286.5, { align: 'right' });

  return doc;
}

const recipe = {
  id: 'tataki-atun',
  title: 'Tataki de Atún con Miel, Soja y Sésamo',
  subtitle: 'Sellado en bloque cuadrado y marinado osmótico de 2 horas con giros cada 30 min',
  baseServings: 4,
  prepTimeMinutes: 135,
  difficulty: 'Media',
  category: 'Pescados y Mariscos',
  chefNote: 'Sellar primero el lomo en forma de prisma cuadrado a fuego muy vivo para fijar el exterior manteniendo el centro crudo. Dar la vuelta religiosamente cada 30 minutos durante las 2h de marinado.',
  pairing: 'Manzana verde ácida, uva fresca, mojama en lascas o anchoa de calibre grande.',
  ingredients: [
    { name: 'Lomo de atún rojo fresco', amount: 500, unit: 'g', notes: 'cortado en prisma rectangular' },
    { name: 'Salsa de soja', amount: 60, unit: 'ml' },
    { name: 'Miel de flores', amount: 25, unit: 'g' },
    { name: 'Semillas de sésamo tostado', amount: 30, unit: 'g', notes: 'blanco y negro' },
    { name: 'Aceite de sésamo virgen', amount: 15, unit: 'ml' },
    { name: 'Jengibre fresco rallado', amount: 10, unit: 'g' }
  ],
  steps: [
    { stepNumber: 1, title: 'Corte y Preparación', instruction: 'Limpiar el lomo de atún y cortar en un prisma uniforme de unos 4-5 cm de lado.', tip: 'El corte regular garantiza un sellado parejo en las 4 caras.' },
    { stepNumber: 2, title: 'Sellado a Fuego Vivo', temperature: '220°C', timerSeconds: 60, instruction: 'En una sartén bien caliente con unas gotas de aceite, sellar el lomo 15 segundos por cada uno de sus 4 lados.', tip: 'No sobrepasar los 15s para preservar el corazón crudo.' },
    { stepNumber: 3, title: 'Baño Marinado Osmótico', timerSeconds: 7200, instruction: 'Mezclar la soja, miel, aceite de sésamo y jengibre. Sumergir el lomo en un recipiente ajustado en la nevera durante 2 horas.', tip: 'Girar el prisma cada 30 min.' },
    { stepNumber: 4, title: 'Rebozado y Corte Fino', instruction: 'Sacar del marinado, escurrir ligeramente, rebozar en el sésamo tostado y cortar en láminas de 5 mm con un cuchillo bien afilado.' }
  ]
};

const startTime = performance.now();
const doc = generateVectorPdf(recipe, 4, '');
const duration = performance.now() - startTime;
const pdfBuf = doc.output('arraybuffer');
fs.writeFileSync('./scripts/test_tataki_full.pdf', Buffer.from(pdfBuf));
console.log(`Successfully generated vector PDF in ${duration.toFixed(2)}ms! Output size: ${pdfBuf.byteLength} bytes.`);
