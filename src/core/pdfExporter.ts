import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Alert, Dimensions, Platform } from 'react-native';
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
 * Muestra una Hoja de Acción táctil (Action Sheet) con estética de iOS para compartir
 * o descargar el PDF en navegadores móviles (Safari en iPhone / Chrome Android).
 * Al pulsar el botón "Compartir", se ejecuta dentro de un evento de clic directo del usuario,
 * lo que renueva el token de activación gestual requerido por Safari para abrir
 * la Hoja de Compartir Nativa (WhatsApp, Telegram, AirDrop, Guardar en Archivos).
 */
function showMobileShareSheetModal(options: {
  fileName: string;
  recipeTitle: string;
  pdfFile: File;
  blobUrl: string;
  canNativeShare: boolean;
}): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.getElementById('cookbook-share-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'cookbook-share-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '9999999';
    overlay.style.backgroundColor = 'rgba(18, 15, 12, 0.65)';
    overlay.style.backdropFilter = 'blur(12px)';
    (overlay.style as any).webkitBackdropFilter = 'blur(12px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'flex-end';
    overlay.style.justifyContent = 'center';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.25s ease';

    const sheet = document.createElement('div');
    sheet.style.width = '100%';
    sheet.style.maxWidth = '500px';
    sheet.style.backgroundColor = '#FAF7F0';
    sheet.style.borderTopLeftRadius = '26px';
    sheet.style.borderTopRightRadius = '26px';
    sheet.style.padding = '14px 20px 30px 20px';
    sheet.style.boxShadow = '0 -10px 35px rgba(0, 0, 0, 0.28)';
    sheet.style.fontFamily = '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';
    sheet.style.boxSizing = 'border-box';
    sheet.style.transform = 'translateY(100%)';
    sheet.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

    sheet.innerHTML = `
      <div style="width: 38px; height: 5px; background: #D5C9B3; border-radius: 3px; margin: 0 auto 14px auto;"></div>
      <div style="text-align: center; margin-bottom: 18px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #FFF3DD; border-radius: 12px; margin-bottom: 8px; border: 1px solid #EED39B;">
          <span style="font-size: 22px;">📄</span>
        </div>
        <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #181512; font-family: -apple-system-ui-serif, Georgia, serif;">Ficha Gastronómica Lista</h3>
        <p style="margin: 0; font-size: 12.5px; color: #7A6E62; font-weight: 500;">${options.fileName} · 1 página A4</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
        <button id="cookbook-btn-share" style="width: 100%; background: linear-gradient(135deg, #D4912A 0%, #B86B11 100%); color: #FFFFFF; border: none; border-radius: 14px; padding: 15px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(184, 107, 17, 0.32);">
          <span>📤</span> Compartir (WhatsApp, Telegram...)
        </button>

        <button id="cookbook-btn-download" style="width: 100%; background: #FFFFFF; color: #181512; border: 1.5px solid #E2D6C1; border-radius: 14px; padding: 13px; font-size: 14.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>📥</span> Guardar o Descargar Archivo
        </button>

        <button id="cookbook-btn-preview" style="width: 100%; background: transparent; color: #8A5816; border: none; padding: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer;">
          👁️ Ver Ficha en Pantalla
        </button>
      </div>

      <button id="cookbook-btn-close" style="width: 100%; background: rgba(24, 21, 18, 0.05); color: #5A4E42; border: none; border-radius: 12px; padding: 11px; font-size: 14px; font-weight: 600; cursor: pointer;">
        Cerrar
      </button>
    `;

    overlay.appendChild(sheet);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      sheet.style.transform = 'translateY(0)';
    });

    const cleanup = () => {
      overlay.style.opacity = '0';
      sheet.style.transform = 'translateY(100%)';
      setTimeout(() => {
        overlay.remove();
        setTimeout(() => URL.revokeObjectURL(options.blobUrl), 15000);
        resolve();
      }, 260);
    };

    const btnShare = sheet.querySelector('#cookbook-btn-share') as HTMLButtonElement;
    btnShare.onclick = async () => {
      const nav = typeof navigator !== 'undefined' ? (navigator as any) : null;
      if (nav?.share && nav?.canShare && nav.canShare({ files: [options.pdfFile] })) {
        try {
          await nav.share({
            files: [options.pdfFile],
            title: `Ficha Técnica: ${options.recipeTitle}`,
          });
          cleanup();
        } catch (e: any) {
          const msg = String(e?.message || '').toLowerCase();
          if (msg.includes('abort') || msg.includes('cancel')) {
            return;
          }
          alert('No se pudo abrir el menú de compartir: ' + e.message);
        }
      } else {
        alert(
          'En navegadores web por conexión HTTP local, las políticas de seguridad de Apple no permiten a una web abrir directamente WhatsApp o Telegram.\n\n👉 Solución en 2 pasos:\n1. Pulsa "Ver Ficha en Pantalla".\n2. En la barra inferior de Safari, pulsa el botón Compartir (icono ⎋) para enviarlo a WhatsApp, Telegram o Archivos.\n\nO si prefieres compartir con 1 toque automático, abre la app desde Expo Go.'
        );
      }
    };

    const btnDownload = sheet.querySelector('#cookbook-btn-download') as HTMLButtonElement;
    btnDownload.onclick = () => {
      const link = document.createElement('a');
      link.href = options.blobUrl;
      link.download = options.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      cleanup();
    };

    const btnPreview = sheet.querySelector('#cookbook-btn-preview') as HTMLButtonElement;
    btnPreview.onclick = () => {
      window.open(options.blobUrl, '_blank');
      cleanup();
    };

    const btnClose = sheet.querySelector('#cookbook-btn-close') as HTMLButtonElement;
    btnClose.onclick = cleanup;
    overlay.onclick = (e) => {
      if (e.target === overlay) cleanup();
    };
  });
}

/**
 * Genera un archivo PDF real en la Web utilizando jsPDF y html2canvas.
 * En navegadores móviles (Safari en iPhone / Chrome en Android), abre la hoja interactiva
 * de compartir para enviar el PDF por WhatsApp, Telegram, Guardar en Archivos, etc.
 * En navegadores de escritorio, descarga automáticamente el archivo PDF generado.
 */
async function exportPdfOnWeb(
  html: string,
  recipeTitle: string,
  imageBase64?: string,
  onGenerated?: () => void
): Promise<void> {
  const safeTitle = (recipeTitle || 'Receta')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 32);
  const fileName = `Ficha_${safeTitle || 'Receta'}.pdf`;

  const container = document.createElement('div');
  container.id = 'cookbook-pdf-web-export';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '794px'; // 210mm a 96 DPI
  container.style.zIndex = '-9999';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';
  container.style.backgroundColor = '#FAF7F0';
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    const waitWithTimeout = (promise: Promise<any>, ms = 1200) =>
      Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);

    // 1. Asegurar precarga de imágenes con timeout estricto para evitar bloqueos en Safari
    if (imageBase64) {
      await waitWithTimeout(
        new Promise<void>((resolve) => {
          const preImg = new Image();
          preImg.onload = () => resolve();
          preImg.onerror = () => resolve();
          preImg.src = imageBase64;
          if (preImg.complete) resolve();
        }),
        1200
      );
    }

    const imgs = Array.from(container.getElementsByTagName('img'));
    if (imgs.length > 0) {
      await waitWithTimeout(
        Promise.all(
          imgs.map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) resolve();
                else {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                }
              })
          )
        ),
        1200
      );
    }

    const html2canvasModule = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const nav = typeof navigator !== 'undefined' ? (navigator as any) : null;
    const isTouchMobile =
      /iPhone|iPad|iPod|Android|Mobile/i.test(nav?.userAgent || '') ||
      (nav?.platform === 'MacIntel' && nav?.maxTouchPoints > 1);

    const canvasPromise = html2canvasModule(container, {
      scale: isTouchMobile ? 1.5 : 2, // 1.5 en móviles para evitar saturación de memoria de Safari
      useCORS: true,
      logging: false,
      backgroundColor: '#FAF7F0',
    });

    const canvasTimeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('html2canvas timeout')), 4500)
    );

    const canvas = await Promise.race([canvasPromise, canvasTimeout]);

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Proporción natural A4: el lienzo mantiene su altura proporcional sin estirarse verticalmente
    const imgHeight = (canvas.height * 210) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, Math.min(imgHeight, 297));

    const pdfBlob = pdf.output('blob');
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Notificar inmediatamente que el PDF ya está listo para desactivar el spinner de la pantalla
    onGenerated?.();

    // En navegadores de escritorio (PC / Mac):
    // Abrir directamente el diálogo nativo "Guardar como..." para que el usuario elija
    // exactamente la carpeta y ubicación donde guardar su archivo PDF sin ventanas de compartir intermedias.
    if (!isTouchMobile) {
      const win = typeof window !== 'undefined' ? (window as any) : null;
      if (win && typeof win.showSaveFilePicker === 'function') {
        try {
          const handle = await win.showSaveFilePicker({
            suggestedName: fileName,
            types: [
              {
                description: 'Documento PDF (*.pdf)',
                accept: { 'application/pdf': ['.pdf'] },
              },
            ],
          });
          const writable = await handle.createWritable();
          await writable.write(pdfBlob);
          await writable.close();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
          return;
        } catch (pickerErr: any) {
          if (pickerErr?.name === 'AbortError') {
            setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
            return; // El usuario canceló voluntariamente el diálogo de guardar
          }
          console.warn('[PDFExporter] Error en showSaveFilePicker, recurriendo a descarga tradicional:', pickerErr);
        }
      }

      // Fallback estándar: descarga directa en el navegador
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      return;
    }

    // En dispositivos móviles (Safari en iOS / Chrome Android):
    // Si el navegador permite compartir directamente sin requerir nuevo gesto:
    if (nav?.share && nav?.canShare && nav.canShare({ files: [pdfFile] })) {
      try {
        await nav.share({
          files: [pdfFile],
          title: `Ficha Técnica: ${recipeTitle}`,
        });
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        return;
      } catch (shareErr: any) {
        const msg = String(shareErr?.message || '').toLowerCase();
        if (msg.includes('abort') || msg.includes('cancel')) {
          setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
          return;
        }
        console.warn('[PDFExporter] nav.share automático rechazado por Safari, mostrando selector interactivo:', shareErr);
      }
    }

    // Mostrar el selector de compartir móvil táctil para que el usuario elija su app de destino
    await showMobileShareSheetModal({
      fileName,
      recipeTitle,
      pdfFile,
      blobUrl,
      canNativeShare: Boolean(nav?.share && nav?.canShare && nav.canShare({ files: [pdfFile] })),
    });
  } catch (err) {
    console.warn('[PDFExporter] Error en exportPdfOnWeb con jsPDF:', err);
    onGenerated?.();
    // Fallback: descarga directa como archivo HTML si html2canvas no pudiera inicializarse
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${fileName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    container.remove();
  }
}

/**
 * Exporta la Ficha Gastronómica en un diseño editorial unificado de alta cocina:
 * - Todo integrado dentro de un único marco editorial ("sheet-card") sin bloques inconexos.
 * - Paleta viva y cálida de alto contraste: Carbón Espresso (#181512), Dorado Culinario (#C67D1E),
 *   Terracota (#C84B24) y Crema Marfil (#FAF7F0).
 * - Sistema tipográfico nativo de alta fidelidad (-apple-system-ui-serif para títulos editoriales + SF Pro para texto técnico).
 * - Fotografía del plato grande y protagonista (205px–255px de alto) con el título editorial integrado.
 */
export async function exportRecipeToPdfAndShare(
  recipe: Recipe,
  currentServings?: number,
  onGenerated?: () => void
): Promise<void> {
  const targetServings = currentServings || recipe.baseServings;
  const scaleFactor = targetServings / (recipe.baseServings || 1);
  const density = getDensityProfile(recipe);

  let imageBase64 = '';
  try {
    const imgPromise = getRecipeImageBase64(recipe);
    const timeoutPromise = new Promise<string>((resolve) =>
      setTimeout(() => resolve(recipe.imageUrl || ''), 2000)
    );
    imageBase64 = await Promise.race([imgPromise, timeoutPromise]);
  } catch (e) {
    console.warn('[PDFExporter] Error o timeout resolviendo imagen base64 para PDF:', e);
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <title>${recipe.title} - Robertito's CookBook</title>
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
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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

        /* 1. Cabecera Integrada con el Banner del Logo Centrado */
        .brand-banner {
          background: #FAF7F0;
          border-bottom: 2px solid #D4912A;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .brand-lockup {
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* 2. Fotografía Grande y Protagonista del Plato con Título Integrado (Preserva aspecto 100%) */
        .hero-section {
          position: relative;
          width: 100%;
          height: ${density.heroHeight};
          background-color: #181512;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(18, 14, 10, 0.04) 0%,
            rgba(18, 14, 10, 0.32) 48%,
            rgba(18, 14, 10, 0.86) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px 22px 16px 22px;
        }
        .dish-title {
          font-family: -apple-system-ui-serif, 'New York', Georgia, 'Times New Roman', serif;
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
          font-family: -apple-system-ui-serif, 'New York', Georgia, 'Times New Roman', serif;
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
        </div>

        <!-- 2. Imagen Grande del Plato con Título Integrado (Preserva aspecto natural 1:1 / 4:3 sin estirar) -->
        <div class="hero-section" style="${imageBase64 ? `background-image: url('${imageBase64}');` : ''}">
          <div class="hero-overlay">
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
      await exportPdfOnWeb(html, recipe.title, imageBase64, onGenerated);
      return;
    }

    // En iOS y Android:
    // 1. Generamos el archivo PDF sin forzar dimensiones fijas en pixels (se rige por CSS @page A4)
    const result = await Print.printToFileAsync({
      html,
      base64: false,
    });

    if (!result?.uri) {
      throw new Error('No se obtuvo la ruta del archivo PDF generado.');
    }

    // Desactivar spinner de generación de inmediato una vez que el PDF está compilado
    onGenerated?.();

    // 2. En iOS y Android copiamos a un archivo limpio con extensión .pdf en caché
    // Esto garantiza un nombre claro al compartir por WhatsApp / Telegram / Archivos
    let targetShareUri = result.uri;
    try {
      const safeTitle = (recipe.title || 'Receta')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 32);
      const pdfFileName = `Ficha_${safeTitle || 'Receta'}.pdf`;
      const cleanPath = `${FileSystem.cacheDirectory}${pdfFileName}`;

      await FileSystem.deleteAsync(cleanPath, { idempotent: true });
      await FileSystem.copyAsync({
        from: result.uri,
        to: cleanPath,
      });
      targetShareUri = cleanPath;
    } catch (copyErr) {
      console.warn('[PDFExporter] Error renombrando PDF en caché, usando uri temporal:', copyErr);
      targetShareUri = result.uri;
    }

    // 3. Abrir exclusivamente el Selector de Compartir Nativo (WhatsApp, Telegram, etc.)
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      const isPad = Platform.OS === 'ios' && (Platform as any).isPad;
      const shareOptions: Sharing.SharingOptions = {
        UTI: 'com.adobe.pdf',
        mimeType: 'application/pdf',
        dialogTitle: `Compartir Ficha: ${recipe.title}`,
      };
      // En iPad se requiere anchor con dimensiones positivas; en iPhone debe ser modal inferior sin anchor
      if (isPad) {
        const { width, height } = Dimensions.get('window');
        shareOptions.anchor = {
          x: Math.round(width / 2),
          y: Math.round(height / 2),
          width: 1,
          height: 1,
        };
      }
      await Sharing.shareAsync(targetShareUri, shareOptions);
    } else {
      Alert.alert(
        'Compartir PDF',
        'La función de compartir no está disponible en este dispositivo.'
      );
    }
  } catch (err: any) {
    onGenerated?.();
    console.error('[PDFExporter] Error al exportar PDF:', err);
    const msg = String(err?.message || '');
    if (
      msg.toLowerCase().includes('cancel') ||
      msg.toLowerCase().includes('dismiss') ||
      msg.toLowerCase().includes('abort')
    ) {
      return;
    }

    Alert.alert(
      'Ficha Gastronómica',
      'No se pudo abrir el selector de compartir. Inténtalo de nuevo.'
    );
  }
}
