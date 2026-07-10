const fs = require('fs');
const path = require('path');

console.log('🔄 Running automated SEO & Slug update...');

// 1. Update app.json slug with random female/cycle related terms to stay "fresh"
const appJsonPath = path.join(__dirname, 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const slugPrefixes = ['him', 'her', 'women', 'feminine'];
const slugMiddles = ['period', 'cycle', 'menstrual', 'fertility'];
const slugSuffixes = ['tracker', 'companion', 'calendar', 'app'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const newSlug = `${randomItem(slugPrefixes)}-${randomItem(slugMiddles)}-${randomItem(slugSuffixes)}-${Date.now()}`;
appJson.expo.slug = newSlug;

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
console.log(`✅ Updated slug to: ${newSlug}`);

// 2. Update sitemap.xml <lastmod> tags to current date to ping crawlers
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  sitemapContent = sitemapContent.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`✅ Updated sitemap.xml timestamps to ${today}`);
}

console.log('🚀 SEO update complete! Ready to dominate rankings.');
