import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { Recipe } from '@/types/cookbook';
import { getRecipeImageBase64 } from '@/constants/recipeImages';
import { BRAND_EMBLEM_BASE64, BRAND_WORDMARK_BASE64 } from '@/constants/brandAssets';

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
 * Perfil de densidad adaptativo para que toda la ficha gastronómica
 * (banner de marca, fotografía grande protagonista, metadatos, clave del chef,
 * ingredientes y pasos) quede integrada en UNA SOLA PÁGINA A4 con tipografía uniforme.
 */
function getDensityProfile(recipe: Recipe) {
  const numIngs = recipe.ingredients.length;
  const numSteps = recipe.steps.length;
  const totalChars =
    recipe.steps.reduce((acc, s) => acc + s.instruction.length + (s.tip?.length || 0), 0) +
    recipe.chefNote.length +
    (recipe.pairing?.length || 0);

  if (numSteps >= 8 || numIngs >= 13 || totalChars > 1450) {
    return {
      heroHeight: '205px',
      titleSize: '20pt',
      subtitleSize: '9pt',
      sectionTitleSize: '12pt',
      bodySize: '8.4pt',
      metaSize: '8pt',
      bodyPadding: '12px 18px 10px 18px',
      ingPadding: '4px 0',
      stepGap: '6px',
      stepNumSize: '20px',
      chefPadding: '8px 12px',
    };
  }

  if (numSteps >= 6 || numIngs >= 10 || totalChars > 950) {
    return {
      heroHeight: '230px',
      titleSize: '22pt',
      subtitleSize: '9.5pt',
      sectionTitleSize: '12.5pt',
      bodySize: '8.8pt',
      metaSize: '8.2pt',
      bodyPadding: '14px 20px 12px 20px',
      ingPadding: '5px 0',
      stepGap: '8px',
      stepNumSize: '21px',
      chefPadding: '10px 14px',
    };
  }

  return {
    heroHeight: '255px',
    titleSize: '24pt',
    subtitleSize: '10pt',
    sectionTitleSize: '13pt',
    bodySize: '9.2pt',
    metaSize: '8.5pt',
    bodyPadding: '16px 22px 14px 22px',
    ingPadding: '6px 0',
    stepGap: '10px',
    stepNumSize: '22px',
    chefPadding: '11px 16px',
  };
}

/**
 * Imprime el documento HTML en la web utilizando un iframe aislado.
 */
function printHtmlOnWeb(html: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const oldFrame = document.getElementById('cookbook-pdf-iframe');
      if (oldFrame) {
        oldFrame.remove();
      }

      const iframe = document.createElement('iframe');
      iframe.id = 'cookbook-pdf-iframe';
      iframe.style.position = 'fixed';
      iframe.style.left = '-10000px';
      iframe.style.top = '-10000px';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      iframe.style.border = 'none';
      iframe.style.zIndex = '-9999';

      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document;
      if (!frameDoc) {
        resolve();
        return;
      }

      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      const triggerPrint = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (err) {
          console.warn('Fallo al invocar print en iframe:', err);
          const win = window.open('', '_blank');
          if (win) {
            win.document.write(html);
            win.document.close();
            win.focus();
            setTimeout(() => win.print(), 350);
          }
        } finally {
          setTimeout(() => {
            iframe.remove();
            resolve();
          }, 1500);
        }
      };

      const imgs = frameDoc.images;
      if (!imgs || imgs.length === 0) {
        setTimeout(triggerPrint, 250);
      } else {
        let loaded = 0;
        const total = imgs.length;
        let triggered = false;

        const onImageDone = () => {
          loaded++;
          if (loaded >= total && !triggered) {
            triggered = true;
            setTimeout(triggerPrint, 200);
          }
        };

        for (let i = 0; i < total; i++) {
          if (imgs[i].complete) {
            onImageDone();
          } else {
            imgs[i].onload = onImageDone;
            imgs[i].onerror = onImageDone;
          }
        }

        setTimeout(() => {
          if (!triggered) {
            triggered = true;
            triggerPrint();
          }
        }, 1800);
      }
    } catch (e) {
      console.error('Error en printHtmlOnWeb:', e);
      resolve();
    }
  });
}

/**
 * Exporta la Ficha Gastronómica en un diseño editorial unificado de alta cocina:
 * - Todo integrado dentro de un único marco editorial ("sheet-card") sin bloques inconexos.
 * - Paleta viva y cálida de alto contraste: Carbón Espresso (#181512), Dorado Culinario (#C67D1E),
 *   Terracota (#C84B24) y Crema Marfil (#FAF7F0).
 * - Sistema tipográfico unificado de 2 familias (Fraunces para títulos + Plus Jakarta Sans para texto técnico).
 * - Fotografía del plato grande y protagonista (205px–255px de alto) con el título editorial integrado.
 */
export async function exportRecipeToPdfAndShare(
  recipe: Recipe,
  currentServings?: number
): Promise<void> {
  const targetServings = currentServings || recipe.baseServings;
  const scaleFactor = targetServings / (recipe.baseServings || 1);
  const density = getDensityProfile(recipe);
  const activeTimersCount = recipe.steps.filter((s) => (s.timerSeconds ?? 0) > 0).length;

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
          <div class="ing-left">
            <span class="ing-dot"></span>
            <span class="ing-name">
              ${ing.name}
              ${ing.notes ? `<span class="ing-note"> · ${ing.notes}</span>` : ''}
            </span>
          </div>
          <span class="ing-qty">${scaled} ${ing.unit}</span>
        </li>
      `;
    })
    .join('');

  const stepsHtml = recipe.steps
    .map((st) => {
      const timerLabel = formatTimerLabel(st.timerSeconds);
      return `
        <div class="step-item">
          <div class="step-num">${st.stepNumber}</div>
          <div class="step-body">
            <div class="step-head">
              <span class="step-title">${st.title}</span>
              <div class="step-pills">
                ${
                  st.temperature
                    ? `<span class="pill pill-temp">${st.temperature}</span>`
                    : ''
                }
                ${
                  timerLabel
                    ? `<span class="pill pill-timer">${timerLabel}</span>`
                    : ''
                }
              </div>
            </div>
            <p class="step-desc">${st.instruction}</p>
            ${
              st.tip
                ? `<div class="step-tip"><strong>Matiz técnico:</strong> ${st.tip}</div>`
                : ''
            }
          </div>
        </div>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>${recipe.title} - Robertito's CookBook</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        @page {
          size: 210mm 297mm;
          margin: 5mm 6mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          max-height: 286mm;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #181512;
          background-color: #FAF7F0;
          font-size: ${density.bodySize};
          line-height: 1.4;
        }
        @media print {
          @page {
            size: 210mm 297mm;
            margin: 5mm 6mm;
          }
          html, body {
            width: 100% !important;
            height: 100% !important;
            background-color: #FAF7F0 !important;
          }
        }

        /* Marco Unificado de la Ficha Gastronómica */
        .sheet-card {
          width: 100%;
          height: 100%;
          max-height: 285mm;
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid #E2D6C1;
          box-shadow: 0 8px 24px rgba(24, 21, 18, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* 1. Cabecera Integrada con el Banner del Logo */
        .brand-banner {
          background: #FAF7F0;
          border-bottom: 2px solid #D4912A;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .brand-lockup {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-emblem {
          height: 38px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .brand-wordmark {
          height: 34px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .brand-badge {
          background: #181512;
          color: #FAF7F0;
          font-size: ${density.metaSize};
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 999px;
        }

        /* 2. Fotografía Grande y Protagonista del Plato con Título Integrado */
        .hero-section {
          position: relative;
          width: 100%;
          height: ${density.heroHeight};
          background: #181512;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: saturate(1.1) contrast(1.04);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 14, 10, 0.05) 0%,
            rgba(18, 14, 10, 0.35) 42%,
            rgba(18, 14, 10, 0.88) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px 22px 16px 22px;
        }
        .hero-eyebrow {
          display: inline-block;
          align-self: flex-start;
          background: #D4912A;
          color: #FFFFFF;
          font-size: 7.5pt;
          font-weight: 800;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 6px;
        }
        .dish-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: ${density.titleSize};
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.4px;
          margin: 0 0 4px 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
        }
        .dish-subtitle {
          font-size: ${density.subtitleSize};
          font-weight: 500;
          color: rgba(250, 247, 240, 0.92);
          line-height: 1.32;
          margin: 0;
          max-width: 92%;
        }

        /* 3. Barra Integrada de Parámetros de Cocción (Alto Contraste) */
        .metrics-strip {
          display: flex;
          align-items: center;
          background: #181512;
          color: #FFFFFF;
          padding: 8px 20px;
          border-bottom: 1px solid #E2D6C1;
          flex-shrink: 0;
        }
        .metric-cell {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
        }
        .metric-cell:last-child {
          border-right: none;
        }
        .metric-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #D4912A;
          flex-shrink: 0;
        }
        .metric-label {
          font-size: ${density.metaSize};
          color: rgba(250, 247, 240, 0.7);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .metric-value {
          font-size: ${density.bodySize};
          color: #FFFFFF;
          font-weight: 800;
          font-feature-settings: 'tnum';
        }

        /* 4. Cuerpo Principal Integrado */
        .sheet-body {
          flex: 1;
          padding: ${density.bodyPadding};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 0;
          overflow: hidden;
        }

        /* Clave Técnica del Chef y Maridaje */
        .chef-callout {
          background: #FFF9EE;
          border: 1px solid #EED6A7;
          border-left: 4px solid #D4912A;
          border-radius: 10px;
          padding: ${density.chefPadding};
          margin-bottom: 12px;
          flex-shrink: 0;
        }
        .chef-callout-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .chef-callout-tag {
          font-size: ${density.metaSize};
          font-weight: 800;
          color: #B86B11;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .chef-callout-text {
          font-size: ${density.bodySize};
          font-weight: 500;
          color: #181512;
          margin: 0;
          line-height: 1.38;
        }
        .pairing-row {
          margin-top: 5px;
          padding-top: 5px;
          border-top: 1px dashed #E6CFA0;
          font-size: ${density.metaSize};
          color: #4A3F35;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pairing-tag {
          font-weight: 800;
          color: #C84B24;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* 5. Dos Columnas Integradas (Ingredientes + Elaboración) */
        .columns-grid {
          flex: 1;
          display: flex;
          gap: 20px;
          min-height: 0;
          overflow: hidden;
        }

        .col-ingredients {
          width: 39%;
          background: #FAF7F0;
          border: 1px solid #E8DFCE;
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .col-steps {
          width: 61%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #181512;
          padding-bottom: 5px;
          margin-bottom: 8px;
          flex-shrink: 0;
        }
        .section-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: ${density.sectionTitleSize};
          font-weight: 700;
          color: #181512;
          margin: 0;
          letter-spacing: -0.2px;
        }
        .section-count {
          font-size: ${density.metaSize};
          font-weight: 700;
          color: #B86B11;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Lista de Ingredientes Uniforme */
        .ing-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        .ing-item {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          padding: ${density.ingPadding};
          border-bottom: 1px solid rgba(24, 21, 18, 0.07);
          font-size: ${density.bodySize};
        }
        .ing-item:last-child {
          border-bottom: none;
        }
        .ing-left {
          display: flex;
          align-items: baseline;
          gap: 7px;
          flex: 1;
          min-width: 0;
        }
        .ing-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #D4912A;
          flex-shrink: 0;
          transform: translateY(-1px);
        }
        .ing-name {
          font-weight: 600;
          color: #181512;
          line-height: 1.28;
        }
        .ing-note {
          font-weight: 400;
          color: #6E6256;
        }
        .ing-qty {
          font-weight: 800;
          color: #B86B11;
          white-space: nowrap;
          font-feature-settings: 'tnum';
          font-size: ${density.bodySize};
        }

        /* Lista de Pasos de Elaboración Uniforme */
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: ${density.stepGap};
          overflow: hidden;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          page-break-inside: avoid;
        }
        .step-num {
          width: ${density.stepNumSize};
          height: ${density.stepNumSize};
          border-radius: 6px;
          background: #181512;
          color: #FFFFFF;
          font-size: ${density.metaSize};
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .step-body {
          flex: 1;
          min-width: 0;
        }
        .step-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 2px;
        }
        .step-title {
          font-size: ${density.bodySize};
          font-weight: 800;
          color: #181512;
        }
        .step-pills {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .pill {
          font-size: ${density.metaSize};
          font-weight: 700;
          padding: 1.5px 7px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .pill-temp {
          background: #FDF0EA;
          color: #C84B24;
          border: 1px solid #F3C6B4;
        }
        .pill-timer {
          background: #FFF6E5;
          color: #B86B11;
          border: 1px solid #EED39B;
        }
        .step-desc {
          font-size: ${density.bodySize};
          color: #3D352E;
          line-height: 1.38;
          margin: 0;
        }
        .step-tip {
          margin-top: 3px;
          padding: 3px 8px;
          background: #FAF7F0;
          border-left: 2.5px solid #D4912A;
          border-radius: 0 4px 4px 0;
          font-size: ${density.metaSize};
          color: #4A3F35;
        }

        /* 6. Pie de Página Integrado */
        .sheet-footer {
          border-top: 1px solid #E8DFCE;
          padding-top: 6px;
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: ${density.metaSize};
          color: #7A6E62;
          flex-shrink: 0;
        }
        .sheet-footer-brand {
          font-weight: 700;
          color: #181512;
        }
      </style>
    </head>
    <body>
      <div class="sheet-card">
        <!-- 1. Cabecera Integrada con el Banner del Logo -->
        <div class="brand-banner">
          <div class="brand-lockup">
            <img class="brand-emblem" src="${BRAND_EMBLEM_BASE64}" alt="Emblema Robertito's" />
            <img class="brand-wordmark" src="${BRAND_WORDMARK_BASE64}" alt="Robertito's CookBook" />
          </div>
          <div class="brand-badge">
            ${recipe.code ? `§ ${recipe.code} · ` : ''}${recipe.category}
          </div>
        </div>

        <!-- 2. Imagen Grande del Plato con Título Integrado -->
        <div class="hero-section">
          ${
            imageBase64
              ? `<img class="hero-img" src="${imageBase64}" alt="${recipe.title}" />`
              : ''
          }
          <div class="hero-overlay">
            <span class="hero-eyebrow">FICHA GASTRONÓMICA DE AUTOR</span>
            <h1 class="dish-title">${recipe.title}</h1>
            ${recipe.subtitle ? `<p class="dish-subtitle">${recipe.subtitle}</p>` : ''}
          </div>
        </div>

        <!-- 3. Barra de Parámetros Técnicos -->
        <div class="metrics-strip">
          <div class="metric-cell">
            <span class="metric-dot"></span>
            <span class="metric-label">Raciones</span>
            <span class="metric-value">${targetServings} pax</span>
          </div>
          <div class="metric-cell">
            <span class="metric-dot"></span>
            <span class="metric-label">Tiempo Total</span>
            <span class="metric-value">${recipe.prepTimeMinutes} min</span>
          </div>
          <div class="metric-cell">
            <span class="metric-dot"></span>
            <span class="metric-label">Nivel Técnico</span>
            <span class="metric-value">${recipe.difficulty}</span>
          </div>
          <div class="metric-cell">
            <span class="metric-dot"></span>
            <span class="metric-label">Control Timers</span>
            <span class="metric-value">${activeTimersCount} ${activeTimersCount === 1 ? 'paso' : 'pasos'}</span>
          </div>
        </div>

        <!-- 4. Cuerpo Principal -->
        <div class="sheet-body">
          <div>
            <!-- Clave Técnica del Chef -->
            <div class="chef-callout">
              <div class="chef-callout-row">
                <span class="chef-callout-tag">Clave del Chef ·</span>
                <p class="chef-callout-text">${recipe.chefNote}</p>
              </div>
              ${
                recipe.pairing
                  ? `<div class="pairing-row">
                      <span class="pairing-tag">Maridaje ·</span>
                      <span>${recipe.pairing}</span>
                     </div>`
                  : ''
              }
            </div>
          </div>

          <!-- 5. Columnas: Ingredientes + Elaboración -->
          <div class="columns-grid">
            <div class="col-ingredients">
              <div class="section-header">
                <h2 class="section-title">Ingredientes</h2>
                <span class="section-count">${targetServings} pax</span>
              </div>
              <ul class="ing-list">
                ${ingredientsHtml}
              </ul>
            </div>

            <div class="col-steps">
              <div class="section-header">
                <h2 class="section-title">Elaboración Paso a Paso</h2>
                <span class="section-count">${recipe.steps.length} pasos</span>
              </div>
              <div class="steps-list">
                ${stepsHtml}
              </div>
            </div>
          </div>

          <!-- 6. Pie de Página -->
          <div class="sheet-footer">
            <span class="sheet-footer-brand">Robertito's CookBook · Alta Cocina & Precisión</span>
            <span>Escala aplicada: ${targetServings} comensales · 1 página A4</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    if (Platform.OS === 'web') {
      await printHtmlOnWeb(html);
      return;
    }

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
