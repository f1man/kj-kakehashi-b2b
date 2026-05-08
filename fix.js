const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('params: Promise<{ lang: Locale }>')) {
    content = content.replace('params: Promise<{ lang: Locale }>', 'params: Promise<{ lang: string }>');
    changed = true;
  }
  
  if (content.includes('params: { lang: string }') && file.includes('pricing')) {
    content = content.replace('params: { lang: string }', 'params: Promise<{ lang: string }>');
    content = content.replace('const tiers = [', 'const { lang } = await params;\n  const tiers = [');
    content = content.replace('export default function PricingPage', 'export default async function PricingPage');
    changed = true;
  }

  if (content.includes('getDictionary(lang)') && !content.includes('as Locale')) {
    content = content.replace(/getDictionary\(lang\)/g, 'getDictionary(lang as Locale)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
