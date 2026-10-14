const fs = require("fs");
const path = require("path");

const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function scanDir(dir) {
  let found = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found += scanDir(fullPath);
    } else if (/\.(tsx?|jsx?|json|css|md)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (emojiRegex.test(content)) {
        console.error(`EMOJI FOUND IN: ${fullPath}`);
        found++;
      }
    }
  }
  return found;
}

const emojiCount = scanDir(path.join(__dirname, "../src"));
console.log(`Scan finished. Emojis found in src/: ${emojiCount}`);
process.exit(emojiCount > 0 ? 1 : 0);
