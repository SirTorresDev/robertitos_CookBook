import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { Recipe } from '@/types/cookbook';
import { getRecipeImageBase64 } from '@/constants/recipeImages';

function formatAmount(amount: number): string {
  if (Number.isInteger(amount)) return String(amount);
  return String(Math.round(amount * 100) / 100).replace('.', ',');
}

function formatTimerLabel(seconds?: number): string {
  if (!seconds || seconds <= 0) return '';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  if (mins > 0) return `${mins} min${secs > 0 ? ` ${secs}s` : ''}`;
  return `${secs}s`;
}

/**
 * Determina el nivel de densidad para forzar estrictamente que toda la receta
 * (imagen, todos los ingredientes, clave técnica y todos los pasos)
 * quepa en UNA ÚNICA PÁGINA A4 sin desbordamientos ni saltos de página.
 */
function getDensityProfile(recipe: Recipe) {
  const numIngs = recipe.ingredients.length;
  const numSteps = recipe.steps.length;
  const totalChars =
    recipe.steps.reduce((acc, s) => acc + s.instruction.length + (s.tip?.length || 0), 0) +
    recipe.chefNote.length +
    (recipe.pairing?.length || 0);

  if (numSteps >= 8 || numIngs >= 13 || totalChars > 1500) {
    return {
      bodyFontSize: '8.2pt',
      titleFontSize: '15pt',
      subtitleFontSize: '8.5pt',
      heroImgWidth: '95px',
      heroImgHeight: '75px',
      itemPadding: '3px 0',
      stepCardPadding: '4px 6px',
      stepCardMargin: '4px',
      stepTitleSize: '9pt',
      badgeSize: '7pt',
      headerMarginBottom: '6px',
      gapBetweenCols: '12px',
    };
  }

  if (numSteps >= 6 || numIngs >= 10 || totalChars > 1000) {
    return {
      bodyFontSize: '8.8pt',
      titleFontSize: '17pt',
      subtitleFontSize: '9pt',
      heroImgWidth: '115px',
      heroImgHeight: '85px',
      itemPadding: '4px 0',
      stepCardPadding: '5px 8px',
      stepCardMargin: '5px',
      stepTitleSize: '9.8pt',
      badgeSize: '7.5pt',
      headerMarginBottom: '8px',
      gapBetweenCols: '14px',
    };
  }

  return {
    bodyFontSize: '9.5pt',
    titleFontSize: '19pt',
    subtitleFontSize: '9.8pt',
    heroImgWidth: '135px',
    heroImgHeight: '100px',
    itemPadding: '5px 0',
    stepCardPadding: '7px 10px',
    stepCardMargin: '7px',
    stepTitleSize: '10.5pt',
    badgeSize: '8pt',
    headerMarginBottom: '10px',
    gapBetweenCols: '16px',
  };
}

/**
 * Genera la ficha técnica culinaria en una ÚNICA HOJA A4 estricta,
 * con la fotografía del plato incrustada en base64, ingredientes escalados,
 * clave del chef y todos los pasos de cocción.
 * No incluye ningún elemento de interfaz de la app.
 */
export async function exportRecipeToPdfAndShare(
  recipe: Recipe,
  currentServings?: number
): Promise<void> {
  const targetServings = currentServings || recipe.baseServings;
  const scaleFactor = targetServings / (recipe.baseServings || 1);
  const density = getDensityProfile(recipe);

  // Obtener imagen en base64 para garantizar renderizado inmediato offline y en AirPrint
  let imageBase64 = '';
  try {
    imageBase64 = await getRecipeImageBase64(recipe);
  } catch (e) {
    console.warn('Error resolviendo imagen base64 para PDF:', e);
    imageBase64 = recipe.imageUrl || '';
  }

  const ingredientsHtml = recipe.ingredients
    .map((ing) => {
      const scaled = formatAmount(ing.amount * scaleFactor);
      return `
        <li class="ing-item">
          <div class="ing-name-wrap">
            <span class="ing-bullet">•</span>
            <span class="ing-name">${ing.name}</span>
            ${ing.notes ? `<span class="ing-note">(${ing.notes})</span>` : ''}
          </div>
          <span class="ing-amount">${scaled} ${ing.unit}</span>
        </li>
      `;
    })
    .join('');

  const stepsHtml = recipe.steps
    .map((st) => {
      const timerLabel = formatTimerLabel(st.timerSeconds);
      return `
        <div class="step-card">
          <div class="step-header">
            <span class="step-num">${st.stepNumber}</span>
            <span class="step-title">${st.title}</span>
            <div class="badges-row">
              ${
                st.temperature
                  ? `<span class="badge badge-temp">🌡️ ${st.temperature}</span>`
                  : ''
              }
              ${
                timerLabel
                  ? `<span class="badge badge-timer">⏱️ ${timerLabel}</span>`
                  : ''
              }
            </div>
          </div>
          <p class="step-desc">${st.instruction}</p>
          ${st.tip ? `<div class="step-tip">💡 <span class="tip-text">${st.tip}</span></div>` : ''}
        </div>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>${recipe.title} - Ficha Técnica</title>
      <style>
        @page {
          size: 210mm 297mm; /* A4 Portrait */
          margin: 6mm 7mm 6mm 7mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          max-height: 285mm;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #1E1915;
          background-color: #FFFFFF;
          font-size: ${density.bodyFontSize};
          line-height: 1.35;
        }
        .page-container {
          height: 100%;
          max-height: 284mm;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        /* Cabecera Técnica Superior */
        .top-masthead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid #C4532B;
          padding-bottom: 3px;
          margin-bottom: 6px;
        }
        .masthead-brand {
          font-size: 8pt;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #C4532B;
        }
        .masthead-code {
          font-size: 7.5pt;
          font-weight: 700;
          color: #6F645B;
          background: #F4EFEA;
          padding: 2px 7px;
          border-radius: 4px;
        }

        /* Hero: Información del Plato + Fotografía Emplatada */
        .hero {
          display: flex;
          gap: 12px;
          align-items: center;
          background: #FAF7F2;
          border: 1px solid #ECE4DA;
          border-radius: 8px;
          padding: 6px 10px;
          margin-bottom: ${density.headerMarginBottom};
        }
        .hero-details {
          flex: 1;
          min-width: 0;
        }
        .category-tag {
          font-size: 7pt;
          font-weight: 800;
          color: #C4532B;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 2px;
        }
        h1.dish-title {
          font-family: 'Georgia', serif;
          font-size: ${density.titleFontSize};
          font-weight: 700;
          color: #1E1915;
          margin: 0 0 2px 0;
          line-height: 1.15;
          letter-spacing: -0.2px;
        }
        p.dish-subtitle {
          font-size: ${density.subtitleFontSize};
          color: #6F645B;
          font-style: italic;
          margin: 0 0 5px 0;
          line-height: 1.25;
        }
        .meta-strip {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .meta-pill {
          font-size: 7.5pt;
          font-weight: 600;
          background: #FFFFFF;
          border: 1px solid #DFD5C8;
          padding: 2px 7px;
          border-radius: 12px;
          color: #1E1915;
        }
        .meta-pill strong {
          color: #C4532B;
        }
        .hero-image-wrap {
          flex-shrink: 0;
          width: ${density.heroImgWidth};
          height: ${density.heroImgHeight};
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #DFD5C8;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          background: #EFE8DF;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Distribución en 2 Columnas */
        .content-columns {
          flex: 1;
          display: flex;
          gap: ${density.gapBetweenCols};
          min-height: 0;
          overflow: hidden;
        }

        /* Columna Izquierda: Ingredientes + Clave Técnica + Maridaje */
        .col-left {
          width: 38%;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
        }
        .section-box {
          background: #FAF7F2;
          border: 1px solid #ECE4DA;
          border-radius: 7px;
          padding: 6px 8px;
        }
        .ingredients-box {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .section-header {
          font-size: 7.8pt;
          font-weight: 800;
          color: #C4532B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #E5DCD1;
          padding-bottom: 2px;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }
        .ing-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        .ing-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: ${density.itemPadding};
          border-bottom: 1px dotted rgba(62,42,24,0.12);
          gap: 6px;
          line-height: 1.25;
        }
        .ing-item:last-child {
          border-bottom: none;
        }
        .ing-name-wrap {
          flex: 1;
          min-width: 0;
        }
        .ing-bullet {
          color: #C4532B;
          font-weight: bold;
          margin-right: 3px;
        }
        .ing-name {
          font-weight: 600;
          color: #1E1915;
        }
        .ing-note {
          font-size: 7.2pt;
          color: #877A6F;
          margin-left: 2px;
        }
        .ing-amount {
          font-weight: 700;
          color: #1E1915;
          white-space: nowrap;
          font-feature-settings: 'tnum';
        }

        .chef-note-box {
          border-left: 3px solid #C4532B;
          background: #FAF5F0;
          border-top: 1px solid #EEDFCE;
          border-right: 1px solid #EEDFCE;
          border-bottom: 1px solid #EEDFCE;
          border-radius: 5px;
          padding: 5px 7px;
        }
        .chef-note-title {
          font-size: 7.2pt;
          font-weight: 800;
          color: #C4532B;
          text-transform: uppercase;
          margin-bottom: 2px;
          letter-spacing: 0.4px;
        }
        .chef-note-text {
          margin: 0;
          font-size: 7.5pt;
          line-height: 1.3;
          color: #2F2720;
        }
        .pairing-box {
          font-size: 7.2pt;
          color: #5D534A;
          padding: 4px 6px;
          background: #FFFFFF;
          border: 1px solid #E5DCD1;
          border-radius: 5px;
          line-height: 1.25;
        }
        .pairing-box strong {
          color: #C4532B;
        }

        /* Columna Derecha: Elaboración Paso a Paso */
        .col-right {
          width: 62%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .steps-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: ${density.stepCardMargin};
          overflow: hidden;
        }
        .step-card {
          background: #FAF7F2;
          border: 1px solid #ECE4DA;
          border-radius: 6px;
          padding: ${density.stepCardPadding};
          page-break-inside: avoid;
        }
        .step-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }
        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #C4532B;
          color: #FFFFFF;
          font-size: 7pt;
          font-weight: 800;
          flex-shrink: 0;
          line-height: 15px;
          text-align: center;
        }
        .step-title {
          font-size: ${density.stepTitleSize};
          font-weight: 700;
          color: #1E1915;
          flex: 1;
          line-height: 1.2;
        }
        .badges-row {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .badge {
          font-size: ${density.badgeSize};
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .badge-temp {
          background: #FDF0E9;
          color: #C4532B;
          border: 1px solid #F6D6C6;
        }
        .badge-timer {
          background: #EDF4FE;
          color: #1A73E8;
          border: 1px solid #CCE0FC;
        }
        .step-desc {
          margin: 0;
          color: #332B24;
          line-height: 1.28;
        }
        .step-tip {
          margin-top: 3px;
          padding: 2px 6px;
          background: #FFFFFF;
          border-left: 2px solid #C08A3E;
          border-radius: 0 4px 4px 0;
          font-size: 7.2pt;
          color: #5D534A;
          line-height: 1.2;
        }
        .tip-text {
          font-style: italic;
        }

        /* Pie de Página Minimalista */
        .page-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #ECE4DA;
          padding-top: 3px;
          margin-top: 4px;
          font-size: 6.8pt;
          color: #9C8E82;
        }
        .footer-brand {
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <!-- Masthead -->
        <div class="top-masthead">
          <span class="masthead-brand">Robertito´s CookBook · Ficha Técnica de Alta Cocina</span>
          <span class="masthead-code">${recipe.code ? `MANUAL TÉCNICO § ${recipe.code}` : recipe.category}</span>
        </div>

        <!-- Hero: Título, Datos y Fotografía del Plato -->
        <div class="hero">
          <div class="hero-details">
            <div class="category-tag">${recipe.category}</div>
            <h1 class="dish-title">${recipe.title}</h1>
            <p class="dish-subtitle">${recipe.subtitle}</p>
            <div class="meta-strip">
              <span class="meta-pill">⏱️ <strong>${recipe.prepTimeMinutes}</strong> min</span>
              <span class="meta-pill">👨‍🍳 Dificultad: <strong>${recipe.difficulty}</strong></span>
              <span class="meta-pill">🍽️ Escalado: <strong>${targetServings} pax</strong></span>
              ${recipe.code ? `<span class="meta-pill">Cod: § ${recipe.code}</span>` : ''}
            </div>
          </div>
          ${
            imageBase64
              ? `<div class="hero-image-wrap">
                  <img class="hero-img" src="${imageBase64}" alt="${recipe.title}" />
                 </div>`
              : ''
          }
        </div>

        <!-- Columnas: Ingredientes y Elaboración -->
        <div class="content-columns">
          <!-- Columna Izquierda: Ingredientes + Claves del Chef -->
          <div class="col-left">
            <div class="section-box ingredients-box">
              <div class="section-header">
                <span>Ingredientes</span>
                <span>${targetServings} pax</span>
              </div>
              <ul class="ing-list">
                ${ingredientsHtml}
              </ul>
            </div>

            <div class="chef-note-box">
              <div class="chef-note-title">Clave Técnica · Roberto Torres</div>
              <p class="chef-note-text">${recipe.chefNote}</p>
            </div>

            ${
              recipe.pairing
                ? `<div class="pairing-box">
                    <strong>Maridaje:</strong> ${recipe.pairing}
                   </div>`
                : ''
            }
          </div>

          <!-- Columna Derecha: Pasos Numerados de Elaboración -->
          <div class="col-right">
            <div class="section-header">
              <span>Elaboración Paso a Paso (${recipe.steps.length} pasos)</span>
              <span>Precisión & Tiempos</span>
            </div>
            <div class="steps-container">
              ${stepsHtml}
            </div>
          </div>
        </div>

        <!-- Pie de página técnico (1 única hoja) -->
        <div class="page-footer">
          <span class="footer-brand">Robertito´s CookBook · Precisión Culinaria & Ciencia en Cocina</span>
          <span>Página 1 de 1 · Emisión Técnica</span>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    if (Platform.OS === 'web') {
      await Print.printAsync({ html });
      return;
    }

    // Dimensiones fijas de A4 a 72 dpi (595 x 842 pt) para asegurar 1 página exacta
    const { uri } = await Print.printToFileAsync({
      html,
      width: 595,
      height: 842,
      base64: false,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: `Ficha Técnica: ${recipe.title}`,
      });
    } else {
      await Print.printAsync({ html });
    }
  } catch (err: any) {
    Alert.alert(
      'No se pudo exportar el PDF',
      err?.message || 'Inténtalo de nuevo en unos segundos.'
    );
  }
}
