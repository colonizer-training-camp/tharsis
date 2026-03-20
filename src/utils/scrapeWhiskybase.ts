export type ScrapedBottle = {
  brand: string;
  name: string;
  description: string;
  abv: string;
  meta: string;
  metaValue: string;
};

const WORKER_URL = 'https://tharsis.me-b56.workers.dev';

export const scrapeWhiskybase = async (url: string): Promise<ScrapedBottle> => {
  const res = await fetch(`${WORKER_URL}?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error('Failed to fetch whiskybase page');

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const brand =
    doc.querySelector('h1 span[itemprop="name"]')?.textContent?.trim() ??
    doc.querySelector('h1')?.textContent?.trim() ??
    '';

  const title = doc.querySelector('title')?.textContent?.trim() ?? '';

  // Try to extract name from the page title (usually "Brand Name - Whiskybase")
  let name = '';
  if (title) {
    name = title.replace(/\s*[-–|].*whiskybase.*/i, '').trim();
    // Remove brand prefix if present
    if (brand && name.toLowerCase().startsWith(brand.toLowerCase())) {
      name = name.slice(brand.length).trim();
    }
  }

  // Extract details from the specs table
  const details: Record<string, string> = {};
  doc.querySelectorAll('dt, .property-name, th').forEach((dt) => {
    const key = dt.textContent?.trim().toLowerCase() ?? '';
    const value = dt.nextElementSibling?.textContent?.trim() ?? '';
    if (key && value) details[key] = value;
  });

  // Also try rows in a details/properties list
  doc.querySelectorAll('.details-list li, .whisky-details tr').forEach((row) => {
    const cells = row.querySelectorAll('td, span, div');
    if (cells.length >= 2) {
      const key = cells[0].textContent?.trim().toLowerCase() ?? '';
      const value = cells[1].textContent?.trim() ?? '';
      if (key && value) details[key] = value;
    }
  });

  const abv = details['strength'] ?? details['abv'] ?? details['alcohol'] ?? extractAbv(html) ?? '';

  const ageStr = details['age'] ?? details['stated age'] ?? '';
  const metaValue = ageStr.replace(/[^\d.]/g, '') || 'NAS';

  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute('content') ??
    doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ??
    '';

  return {
    brand,
    name: name || brand,
    description,
    abv: abv.replace('%', '').trim(),
    meta: 'YRS',
    metaValue,
  };
};

const extractAbv = (html: string): string | null => {
  const match =
    html.match(/(\d{2,3}\.?\d*)\s*%\s*(?:vol|abv)/i) ??
    html.match(/(?:strength|abv)[^>]*>\s*(\d{2,3}\.?\d*)\s*%/i);
  return match?.[1] ?? null;
};
