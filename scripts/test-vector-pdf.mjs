import { jsPDF } from 'jspdf';

export function testGeneratePdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  // Page background: Ivory cream
  doc.setFillColor(250, 247, 240);
  doc.rect(0, 0, 210, 297, 'F');

  // Main Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.roundedRect(8, 8, 194, 281, 3, 3, 'FD');

  // Top Banner
  doc.setFillColor(24, 21, 18);
  doc.rect(8, 8, 194, 13, 'F');
  doc.setFillColor(198, 125, 30);
  doc.rect(8, 20.2, 194, 0.8, 'F');

  // Banner branding
  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text("ROBERTITO'S COOKBOOK", 14, 16.5);

  doc.setTextColor(198, 125, 30);
  doc.setFontSize(7.5);
  doc.text("ALTA COCINA & PRECISIÓN", 84, 16.5);

  // Badge
  doc.setFillColor(200, 75, 36);
  doc.roundedRect(154, 11, 42, 6.5, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6.5);
  doc.text("FICHA TÉCNICA OFICIAL", 158, 15.5);

  // Hero section banner
  doc.setFillColor(24, 21, 18);
  doc.rect(8, 56, 194, 19, 'F');

  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text("Tataki de Atún Rojo Balfegó", 14, 66);

  doc.setTextColor(198, 125, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text("Sésamo tostado, emulsión de soja cítrica y wakame", 14, 71);

  // Meta bar
  doc.setFillColor(250, 247, 240);
  doc.rect(8.2, 75, 193.6, 8.5, 'F');
  doc.setDrawColor(200, 190, 180);
  doc.setLineWidth(0.3);
  doc.line(8.2, 83.5, 201.8, 83.5);

  doc.setTextColor(125, 87, 28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("RENDIMIENTO:", 14, 80.5);
  doc.setTextColor(24, 21, 18);
  doc.text("4 personas", 38, 80.5);

  doc.setTextColor(125, 87, 28);
  doc.text("TIEMPO BASE:", 74, 80.5);
  doc.setTextColor(24, 21, 18);
  doc.text("25 min", 95, 80.5);

  doc.setTextColor(125, 87, 28);
  doc.text("DIFICULTAD:", 126, 80.5);
  doc.setTextColor(24, 21, 18);
  doc.text("Alta Cocina", 146, 80.5);

  doc.setTextColor(125, 87, 28);
  doc.text("SECCIÓN:", 168, 80.5);
  doc.setTextColor(24, 21, 18);
  doc.text("Pescados", 182, 80.5);

  // Chef Note
  doc.setFillColor(255, 249, 237);
  doc.roundedRect(12, 86, 186, 14, 1.5, 1.5, 'F');
  doc.setFillColor(198, 125, 30);
  doc.rect(12, 86, 2.5, 14, 'F');

  doc.setTextColor(200, 75, 36);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("✦ CLAVE DEL CHEF:", 17, 91.5);
  doc.setTextColor(56, 43, 27);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const noteLines = doc.splitTextToSize("Marcado ultrarrápido en sartén a 220°C: solo 15 segundos por cada una de las 4 caras para preservar el corazón crudo y sedoso.", 138);
  doc.text(noteLines, 48, 91.5);

  // Two columns divider line
  doc.setDrawColor(220, 215, 208);
  doc.setLineWidth(0.4);
  doc.line(78, 103, 78, 280);

  // Left Column: Ingredientes
  doc.setTextColor(24, 21, 18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text("Ingredientes", 12, 107);
  doc.setTextColor(125, 87, 28);
  doc.setFontSize(7);
  doc.text("4 pax", 74, 107, { align: 'right' });
  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(12, 109, 74, 109);

  const sampleIngs = [
    { name: "Lomo de atún rojo", amount: "500", unit: "g" },
    { name: "Salsa de soja baja en sal", amount: "60", unit: "ml" },
    { name: "Aceite de sésamo tostado", amount: "15", unit: "ml" },
    { name: "Semillas de sésamo mixto", amount: "30", unit: "g" },
    { name: "Jengibre fresco rallado", amount: "10", unit: "g" },
    { name: "Zumo de lima recién exprimido", amount: "20", unit: "ml" },
  ];

  let ingY = 115;
  sampleIngs.forEach((ing) => {
    doc.setFillColor(198, 125, 30);
    doc.circle(14, ingY - 1, 0.8, 'F');
    doc.setTextColor(24, 21, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const ingName = doc.splitTextToSize(ing.name, 44);
    doc.text(ingName, 17, ingY);
    doc.setFont('helvetica', 'bold');
    doc.text(`${ing.amount} ${ing.unit}`, 74, ingY, { align: 'right' });
    ingY += Math.max(ingName.length * 4.5, 6.5);
  });

  // Right Column: Elaboración
  doc.setTextColor(24, 21, 18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text("Elaboración Paso a Paso", 82, 107);
  doc.setTextColor(125, 87, 28);
  doc.setFontSize(7);
  doc.text("4 pasos", 198, 107, { align: 'right' });
  doc.setDrawColor(24, 21, 18);
  doc.setLineWidth(0.4);
  doc.line(82, 109, 198, 109);

  const sampleSteps = [
    { num: 1, title: "Corte del lomo", desc: "Cortar el lomo de atún en lingotes uniformes de 4x4 cm de sección transversal." },
    { num: 2, title: "Marinado flash", desc: "Sumergir en la mezcla de soja, lima y jengibre durante exactamente 12 minutos a 4°C." },
    { num: 3, title: "Costra de sésamo", desc: "Secar ligeramente con papel absorbente y rebozar presionando sobre las semillas de sésamo." },
    { num: 4, title: "Marcado a fuego vivo", desc: "Marcar 15 segundos por cada una de las 4 caras en sartén de hierro muy caliente con unas gotas de aceite de sésamo." },
  ];

  let stepY = 115;
  sampleSteps.forEach((st) => {
    // Number circle
    doc.setFillColor(24, 21, 18);
    doc.circle(85.5, stepY - 1, 3.2, 'F');
    doc.setTextColor(250, 247, 240);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(String(st.num), 85.5, stepY, { align: 'center' });

    // Step title
    doc.setTextColor(24, 21, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(st.title, 91, stepY);

    // Step desc
    doc.setTextColor(56, 43, 27);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const descLines = doc.splitTextToSize(st.desc, 106);
    doc.text(descLines, 91, stepY + 4.5);

    stepY += 6 + descLines.length * 3.8 + 4;
  });

  // Footer
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

  const buf = doc.output('arraybuffer');
  console.log('Vector PDF Generated successfully! Bytes:', buf.byteLength);
}

testGeneratePdf();
