/* eslint-disable no-console */
// Simple scraper to fetch activities and detail content from the provided site.
// Usage: npm run scrape:activities
// Output:
//  - data/assunnah.activities.json  (list items)
//  - data/assunnah.details.json     (detail items keyed by slug)
//  - public/activities/*            (downloaded images)

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
let puppeteer = null;

const BASE_URL = 'https://assunnahfoundation.org';
const ACTIVITIES_URL = `${BASE_URL}/activities`;
const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'activities');
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function downloadImage(url, filenameHint) {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const extMatch = (url.split('?')[0].match(/\.(jpg|jpeg|png|webp|gif)$/i) || [])[0] || '.jpg';
    const fileSafe = filenameHint.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
    const filename = `${fileSafe}${extMatch}`;
    const outPath = path.join(PUBLIC_DIR, filename);
    fs.writeFileSync(outPath, res.data);
    return `/activities/${filename}`;
  } catch (e) {
    console.warn('Image download failed:', url, e.message);
    return url;
  }
}

function toSlug(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function scrapeListPage(pageUrl) {
  // Try dynamic render first (for JS-driven content)
  let renderedHtml = '';
  try {
    if (!puppeteer) {
      puppeteer = require('puppeteer');
    }
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(UA);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9, bn;q=0.8' });
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
    // Scroll to force lazy content load
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          total += distance;
          if (total > document.body.scrollHeight * 2) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });
    // small delay for lazy content
    await page.waitForTimeout(2000);
    renderedHtml = await page.content();
    await browser.close();
  } catch (e) {
    console.warn('Puppeteer failed, falling back to static HTML:', e.message);
  }

  let $;
  if (renderedHtml) {
    $ = cheerio.load(renderedHtml);
  } else {
    const { data } = await axios.get(pageUrl, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9, bn;q=0.8' },
      timeout: 60000,
    });
    $ = cheerio.load(data);
  }

  const cards = [];
  // Try several common containers/selectors
  $('a[href*="/activities/"]').each((_, el) => {
    let href = $(el).attr('href') || '';
    if (!href) return;
    if (!/^https?:\/\//i.test(href)) {
      href = `${BASE_URL}${href}`;
    }
    if (!href.includes('/activities/')) return;
    const slug = href.split('/activities/')[1]?.replace(/\/+$/, '') || '';
    if (!slug) return;

    // Title
    const parent = $(el).closest('article, a, div').first();
    const title =
      parent.find('h1,h2,h3').first().text().trim() ||
      $(el).attr('title')?.trim() ||
      $(el).text().trim();

    // Description
    const description =
      parent.find('p').first().text().trim() ||
      '';

    // Image
    let img = parent.find('img').first().attr('src') || $(el).find('img').first().attr('src') || '';
    if (img && !/^https?:\/\//i.test(img)) {
      img = `${BASE_URL}${img}`;
    }

    if (!title) return;
    const id = slug || toSlug(title);
    cards.push({
      id,
      href,
      title,
      description,
      image: img || '',
      tag: 'কার্যক্রম',
    });
  });

  // Deduplicate by id
  const seen = new Set();
  const unique = cards.filter(c => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  return unique;
}

async function discoverActivitySlugsFromSitemap() {
  try {
    const res = await axios.get(SITEMAP_URL, {
      headers: { 'User-Agent': UA, 'Accept': 'application/xml' },
      timeout: 60000,
    });
    const xml = res.data;
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    const activityUrls = urls.filter((u) => u.includes('/activities/'));
    const slugs = activityUrls
      .map((u) => {
        try {
          const url = new URL(u);
          const parts = url.pathname.split('/').filter(Boolean);
          const idx = parts.indexOf('activities');
          if (idx >= 0 && parts[idx + 1]) return parts[idx + 1].replace(/\/+$/, '');
          return '';
        } catch {
          return u.split('/activities/')[1]?.replace(/\/+$/, '') || '';
        }
      })
      .filter(Boolean);
    return Array.from(new Set(slugs));
  } catch (e) {
    console.warn('Failed to fetch sitemap:', e.message);
    return [];
  }
}

async function scrapeDetail(slug) {
  const url = `${BASE_URL}/activities/${slug}`;
  let $;
  try {
    if (!puppeteer) {
      puppeteer = require('puppeteer');
    }
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(UA);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9, bn;q=0.8' });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(1500);
    const html = await page.content();
    await browser.close();
    $ = cheerio.load(html);
  } catch (e) {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9, bn;q=0.8' },
      timeout: 60000,
    });
    $ = cheerio.load(data);
  }

  const title =
    $('h1').first().text().trim() ||
    $('h2').first().text().trim() ||
    slug;

  let heroImg =
    $('meta[property="og:image"]').attr('content') ||
    $('article img, main img, .content img').first().attr('src') ||
    '';
  if (heroImg && !/^https?:\/\//i.test(heroImg)) {
    heroImg = `${BASE_URL}${heroImg}`;
  }

  const paragraphs = [];
  ($('article p, .content p, main p') || []).each((_, el) => {
    const t = $(el).text().trim();
    if (t) paragraphs.push(t);
  });
  const fullContent = paragraphs.join('\n\n');

  const gallery = [];
  $('article img, .content img, main img').each((_, el) => {
    const src = $(el).attr('src');
    if (!src) return;
    const absolute = /^https?:\/\//i.test(src) ? src : `${BASE_URL}${src}`;
    if (!gallery.includes(absolute)) gallery.push(absolute);
  });

  let videoUrl = '';
  $('iframe').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (src && /youtube|youtu\.be|vimeo/.test(src) && !videoUrl) {
      videoUrl = /^https?:\/\//i.test(src) ? src : `https:${src}`;
    }
  });

  return {
    id: slug,
    image: heroImg ? (heroImg.startsWith('http') ? heroImg : `${BASE_URL}${heroImg}`) : '',
    tag: 'কার্যক্রম',
    title,
    date: '',
    description: paragraphs[0] || '',
    fullContent,
    videoUrl,
    goals: [],
    beneficiaries: '',
    expenditureCategories: [],
    projectArea: '',
    duration: '',
    ctaText: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    galleryImages: gallery.slice(0, 9),
  };
}

async function main() {
  ensureDir(DATA_DIR);
  ensureDir(PUBLIC_DIR);

  console.log('Scraping activities list:', ACTIVITIES_URL);
  let list = await scrapeListPage(ACTIVITIES_URL);

  if (!list || list.length === 0) {
    console.log('No items found on list page. Trying sitemap discovery...');
    const slugs = await discoverActivitySlugsFromSitemap();
    if (slugs.length > 0) {
      list = slugs.map((id) => ({
        id,
        href: `${BASE_URL}/activities/${id}`,
        title: id,
        description: '',
        image: '',
        tag: 'কার্যক্রম',
      }));
    }
  }

  console.log(`Found ${list.length} activities. Downloading images and scraping details...`);

  // Download list thumbnail images
  for (const item of list) {
    if (item.image) {
      const local = await downloadImage(item.image, `${item.id}-thumb`);
      item.image = local;
    }
  }

  // Scrape details per item
  const details = {};
  for (const item of list) {
    try {
      const d = await scrapeDetail(item.id);
      // Download hero image
      if (d.image) {
        d.image = await downloadImage(d.image, `${item.id}-hero`);
      }
      // Download gallery images
      if (Array.isArray(d.galleryImages)) {
        const locally = [];
        for (let i = 0; i < d.galleryImages.length; i++) {
          const g = d.galleryImages[i];
          const localG = await downloadImage(g, `${item.id}-g-${i + 1}`);
          locally.push(localG);
        }
        d.galleryImages = locally;
      }
      details[item.id] = d;
    } catch (e) {
      console.warn('Failed to scrape detail for', item.id, e.message);
    }
  }

  const listPath = path.join(DATA_DIR, 'assunnah.activities.json');
  const detailPath = path.join(DATA_DIR, 'assunnah.details.json');
  fs.writeFileSync(listPath, JSON.stringify(list, null, 2), 'utf8');
  fs.writeFileSync(detailPath, JSON.stringify(details, null, 2), 'utf8');
  console.log('Saved:', listPath, 'and', detailPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


