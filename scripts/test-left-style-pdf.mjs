import { jsPDF } from 'jspdf';
import { BRAND_EMBLEM_BASE64, BRAND_WORDMARK_BASE64 } from '../src/constants/brandAssets.js';

export function testLeftStylePdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

  // 1. Fondo de la página: Marfil (#FAF7F0)
  doc.setFillColor(250, 247, 240);
  doc.rect(0, 0, 210, 297, 'F');

  // 2. Tarjeta editorial principal con marco y esquinas redondeadas
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 214, 193);
  doc.setLineWidth(0.4);
  doc.roundedRect(8, 8, 194, 281, 3, 3, 'FD');

  // 3. Top Banner: Warm cream (#FAF7F0) con logo centrado y línea dorada (#D4912A)
  doc.setFillColor(250, 247, 240);
  doc.rect(8.2, 8.2, 193.6, 15, 'F');
  doc.setFillColor(212, 145, 42); // #D4912A
  doc.rect(8, 23, 194, 0.7, 'F');

  // Logo centrado: Emblem (12mm ancho x 9.5mm alto) + Wordmark (25mm ancho x 8.7mm alto)
  // Ancho total = 12 + 2.5 (gap) + 25 = 39.5mm.
  // X centrado en la tarjeta de 194mm (x de 8 a 202, centro = 105mm):
  // startX = 105 - (39.5 / 2) = 85.25mm
  const startX = 85.25;
  try {
    doc.addImage(BRAND_EMBLEM_BASE64, 'WEBP', startX, 10.8, 12, 9.5);
    doc.addImage(BRAND_WORDMARK_BASE64, 'WEBP', startX + 14.5, 11.2, 25, 8.7);
  } catch (e) {
    console.warn('Logo error:', e);
  }

  // 4. Hero Photo con Aspect Ratio natural (Cover) y Título integrado
  const currentY = 23.7;
  const heroHeight = 65; // Altura generosa y cinematográfica

  // Simulación del fondo del plato / foto
  doc.setFillColor(24, 21, 18);
  doc.rect(8, currentY, 194, heroHeight, 'F');

  // Simulación de degradado oscuro inferior en el tercio inferior de la foto
  doc.setFillColor(18, 14, 10);
  doc.rect(8, currentY + heroHeight - 20, 194, 20, 'F');

  // Título editorial en tipografía serif ('times' bold) integrado sobre la foto
  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(16.5);
  doc.text("Tataki de Atún con Miel, Soja y Sésamo", 14, currentY + heroHeight - 9.5);

  // Subtítulo en crema suave
  doc.setTextColor(240, 235, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.text("Sellado en bloque cuadrado y marinado osmótico de 2 horas con giros cada 30 min", 14, currentY + heroHeight - 4.5);

  // 5. Barra de Métricas estilo izquierda (Carbón #181512 + Puntos dorados #D4912A)
  const metricsY = currentY + heroHeight;
  doc.setFillColor(24, 21, 18);
  doc.rect(8, metricsY, 194, 8, 'F');

  // Dot 1 + RACIONES
  doc.setFillColor(212, 145, 42);
  doc.circle(28, metricsY + 4, 1, 'F');
  doc.setTextColor(190, 180, 170);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text("RACIONES", 31, metricsY + 5.2);
  doc.setTextColor(255, 255, 255);
  doc.text("4 pax", 48, metricsY + 5.2);

  // Dot 2 + TIEMPO TOTAL
  doc.setFillColor(212, 145, 42);
  doc.circle(88, metricsY + 4, 1, 'F');
  doc.setTextColor(190, 180, 170);
  doc.text("TIEMPO TOTAL", 91, metricsY + 5.2);
  doc.setTextColor(255, 255, 255);
  doc.text("135 min", 112, metricsY + 5.2);

  // Dot 3 + NIVEL TÉCNICO
  doc.setFillColor(212, 145, 42);
  doc.circle(150, metricsY + 4, 1, 'F');
  doc.setTextColor(190, 180, 170);
  doc.text("NIVEL TÉCNICO", 153, metricsY + 5.2);
  doc.setTextColor(255, 255, 255);
  doc.text("Media", 175, metricsY + 5.2);

  // 6. Clave del Chef Callout Box
  const chefY = metricsY + 10.5;
  doc.setFillColor(255, 249, 238);
  doc.roundedRect(12, chefY, 186, 12, 1.5, 1.5, 'F');
  doc.setFillColor(212, 145, 42);
  doc.rect(12, chefY, 2.5, 12, 'F');

  doc.setTextColor(184, 107, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.text("CLAVE DEL CHEF:", 17, chefY + 4.8);

  doc.setTextColor(24, 21, 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  const noteLines = doc.splitTextToSize("Sellar primero el lomo en forma de prisma cuadrado a fuego muy vivo para fijar el exterior manteniendo el centro crudo. Dar la vuelta cada 30 min.", 138);
  doc.text(noteLines, 46, chefY + 4.8);

  // 7. Dos Columnas
  const colY = chefY + 16;
  const colDivX = 76;

  // Izquierda: Ingredientes
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(12, colY, 60, 110, 2, 2, 'F');
  doc.setDrawColor(232, 223, 206);
  doc.setLineWidth(0.3);
  doc.roundedRect(12, colY, 60, 110, 2, 2, 'D');

  doc.setTextColor(24, 21, 18);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.text("Ingredientes", 16, colY + 6.5);

  doc.setTextColor(184, 107, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("4 PAX", 68, colY + 6.5, { align: 'right' });

  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(16, colY + 8.5, 68, colY + 8.5);

  // Derecha: Elaboración
  doc.setTextColor(24, 21, 18);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.text("Elaboración Paso a Paso", colDivX + 4, colY + 6.5);

  doc.setTextColor(184, 107, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("5 PASOS", 198, colY + 6.5, { align: 'right' });

  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(colDivX + 4, colY + 8.5, 198, colY + 8.5);

  // 8. Footer
  doc.setFillColor(24, 21, 18);
  doc.rect(8, 282, 194, 7, 'F');
  doc.setTextColor(198, 125, 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Robertito's CookBook · Alta Cocina & Precisión", 14, 286.5);
  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.text("Escala aplicada: 4 comensales · 1 página A4", 196, 286.5, { align: 'right' });

  return doc;
}

const t0 = Date.now();
const doc = testLeftStylePdf();
const t1 = Date.now();
console.log('PDF generated in:', (t1 - t0), 'ms, size:', doc.output('arraybuffer').byteLength, 'bytes');
