import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { Recipe } from '@/types/cookbook';

function formatAmount(amount: number): string {
  if (Number.isInteger(amount)) return String(amount);
  return String(Math.round(amount * 100) / 100).replace('.', ',');
}

function formatTimerLabel(seconds?: number): string {
  if (!seconds || seconds <= 0) return '';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}h ${mins > 0 ? `${mins} min` : ''}`.trim();
  if (mins > 0) return `${mins} min${secs > 0 ? ` ${secs}s` : ''}`;
  return `${secs} seg`;
}

/**
 * Genera un documento PDF minimalista estilo editorial Apple de la receta
 * y abre el menú nativo de compartir de iOS (AirDrop, WhatsApp, Mail, Archivos).
 */
export async function exportRecipeToPdfAndShare(
  recipe: Recipe,
  currentServings?: number
): Promise<void> {
  const targetServings = currentServings || recipe.baseServings;
  const scaleFactor = targetServings / (recipe.baseServings || 1);

  const ingredientsHtml = recipe.ingredients
    .map((ing) => {
      const scaled = formatAmount(ing.amount * scaleFactor);
      return `
        <li class="ing-item">
          <div class="ing-name">
            <strong>${ing.name}</strong>
            ${ing.notes ? `<span class="ing-note">${ing.notes}</span>` : ''}
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
          <p class="step-desc">${st.instruction}</p>
          ${st.tip ? `<div class="step-tip">💡 ${st.tip}</div>` : ''}
        </div>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @page { margin: 28px; }
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; }
        body { color: #1D1D1F; background: #FFFFFF; margin: 0; padding: 12px; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5E5EA; padding-bottom: 12px; margin-bottom: 20px; }
        .brand { font-size: 13px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #C85A32; }
        .code { font-size: 12px; font-weight: 600; color: #6E6E73; background: #F2F2F7; padding: 4px 10px; border-radius: 99px; }
        .hero { display: flex; gap: 20px; align-items: stretch; margin-bottom: 22px; }
        .hero-info { flex: 1; }
        .hero-img { width: 180px; height: 135px; object-fit: cover; border-radius: 16px; }
        .category { font-size: 11px; font-weight: 700; color: #C85A32; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
        h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.6px; margin: 0 0 6px 0; color: #1D1D1F; }
        .subtitle { font-size: 14px; color: #6E6E73; line-height: 1.45; margin: 0 0 14px 0; }
        .meta-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .meta-pill { font-size: 12px; font-weight: 600; background: #F6F6F8; padding: 6px 12px; border-radius: 99px; color: #1D1D1F; }
        .chef-box { background: #FDF3EF; border-left: 3px solid #C85A32; padding: 14px 16px; border-radius: 12px; margin-bottom: 22px; }
        .chef-label { font-size: 10px; font-weight: 800; color: #C85A32; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 4px; }
        .chef-text { font-size: 13.5px; line-height: 1.5; margin: 0; color: #1D1D1F; }
        .pairing { font-size: 12.5px; color: #6E6E73; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(200,90,50,0.15); }
        .grid { display: flex; gap: 24px; align-items: flex-start; }
        .col-ing { width: 36%; background: #F6F6F8; padding: 16px; border-radius: 16px; }
        .col-steps { width: 64%; }
        h2 { font-size: 16px; font-weight: 700; letter-spacing: -0.3px; margin: 0 0 12px 0; }
        .ing-list { list-style: none; padding: 0; margin: 0; }
        .ing-item { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.06); font-size: 13px; gap: 8px; }
        .ing-item:last-child { border-bottom: none; }
        .ing-note { display: block; font-size: 11px; color: #86868B; font-weight: 400; }
        .ing-amount { font-weight: 700; color: #1D1D1F; white-space: nowrap; }
        .step-card { background: #F6F6F8; border-radius: 14px; padding: 13px 15px; margin-bottom: 10px; page-break-inside: avoid; }
        .step-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
        .step-num { width: 22px; height: 22px; border-radius: 11px; background: #1D1D1F; color: #FFF; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; text-align: center; line-height: 22px; }
        .step-title { font-size: 14px; font-weight: 700; color: #1D1D1F; flex: 1; }
        .badge { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 99px; }
        .badge-temp { background: #FDF3EF; color: #C85A32; }
        .badge-timer { background: #E8F0FE; color: #1A73E8; }
        .step-desc { font-size: 13px; color: #3A3A3C; line-height: 1.5; margin: 0; }
        .step-tip { font-size: 12px; color: #6E6E73; background: #FFFFFF; padding: 7px 10px; border-radius: 8px; margin-top: 8px; }
        .footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #E5E5EA; font-size: 11px; color: #86868B; text-align: center; }
      </style>
    </head>
    <body>
      <div class="top-bar">
        <span class="brand">Robertito´s CookBook · Ficha Técnica</span>
        ${recipe.code ? `<span class="code">Manual § ${recipe.code}</span>` : ''}
      </div>

      <div class="hero">
        <div class="hero-info">
          <div class="category">${recipe.category}</div>
          <h1>${recipe.title}</h1>
          <p class="subtitle">${recipe.subtitle}</p>
          <div class="meta-row">
            <span class="meta-pill">⏱️ ${recipe.prepTimeMinutes} min</span>
            <span class="meta-pill">👨‍🍳 Dificultad: ${recipe.difficulty}</span>
            <span class="meta-pill">🍽️ Escalado para ${targetServings} pax</span>
          </div>
        </div>
        ${
          recipe.imageUrl
            ? `<img class="hero-img" src="${recipe.imageUrl}" alt="${recipe.title}" />`
            : ''
        }
      </div>

      <div class="chef-box">
        <div class="chef-label">Clave Técnica de Roberto Torres</div>
        <p class="chef-text">${recipe.chefNote}</p>
        ${
          recipe.pairing
            ? `<div class="pairing"><strong>Maridaje recomendado:</strong> ${recipe.pairing}</div>`
            : ''
        }
      </div>

      <div class="grid">
        <div class="col-ing">
          <h2>Ingredientes (${targetServings} pax)</h2>
          <ul class="ing-list">
            ${ingredientsHtml}
          </ul>
        </div>
        <div class="col-steps">
          <h2>Ejecución Paso a Paso</h2>
          ${stepsHtml}
        </div>
      </div>

      <div class="footer">
        Exportado desde Robertito´s CookBook para iOS · Roberto Torres
      </div>
    </body>
    </html>
  `;

  try {
    if (Platform.OS === 'web') {
      await Print.printAsync({ html });
      return;
    }

    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: `Exportar receta: ${recipe.title}`,
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
