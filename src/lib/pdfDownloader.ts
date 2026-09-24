/**
 * Helper utility to export HTML elements to PDF safely,
 * automatically converting modern CSS Color 4 functions (like oklch, oklab, color-mix)
 * to standard RGB/Hex so that html2canvas doesn't throw:
 * "Error: Attempting to parse an unsupported color function 'oklch'"
 */

export function sanitizeOklchColors(container: HTMLElement | Document): void {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const allElements = container.querySelectorAll('*');
    const elements: HTMLElement[] = [
      ...(container instanceof HTMLElement ? [container] : []),
      ...(Array.from(allElements) as HTMLElement[])
    ];

    const colorProperties = [
      'color',
      'background-color',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline-color',
      'fill',
      'stroke',
      'text-decoration-color'
    ];

    for (const el of elements) {
      if (!el || !el.style) continue;
      const computed = window.getComputedStyle(el);
      if (!computed) continue;

      for (const prop of colorProperties) {
        const val = computed.getPropertyValue(prop);
        if (val && typeof val === 'string' && val.includes('oklch')) {
          const resolved = val.replace(/oklch\([^)]+\)/g, (match) => {
            try {
              ctx.fillStyle = '#000000';
              ctx.fillStyle = match;
              return ctx.fillStyle || '#333333';
            } catch {
              return '#333333';
            }
          });
          el.style.setProperty(prop, resolved, 'important');
        }
      }
    }
  } catch (err) {
    console.warn('Sanitización de estilos PDF:', err);
  }
}

export async function downloadPdfFromElement(
  element: HTMLElement,
  fileName: string,
  margin = [6, 6, 6, 6]
): Promise<boolean> {
  try {
    if (!(window as any).html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
      });
    }

    const opt = {
      margin: margin,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc: Document) => {
          sanitizeOklchColors(clonedDoc);
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await (window as any).html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error('Error generando PDF con html2pdf, abriendo diálogo de impresión:', err);
    if (typeof window !== 'undefined') {
      window.print();
    }
    return false;
  }
}
