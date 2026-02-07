// Node.js (18+ has global fetch). For older Node, use the https fallback below.
async function decodeDoc(url) {
  const html = await fetchText(url);

  // Extract table rows.
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
  const rows = [];
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    rows.push(rowMatch[1]);
  }

  const points = [];
  for (let i = 1; i < rows.length; i++) { // skip header row
    const cells = [];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rows[i])) !== null) {
      const raw = cellMatch[1]
        .replace(/<[^>]+>/g, "")
        .trim();
      cells.push(decodeEntities(raw));
    }
    if (cells.length >= 3) {
      const x = parseInt(cells[0], 10);
      const ch = cells[1];
      const y = parseInt(cells[2], 10);
      if (!Number.isNaN(x) && !Number.isNaN(y) && ch) {
        points.push({ x, y, ch });
      }
    }
  }

  if (points.length === 0) return;

  const maxX = Math.max(...points.map(p => p.x));
  const maxY = Math.max(...points.map(p => p.y));
  const minX = Math.min(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const grid = Array.from({ length: height }, () => Array(width).fill(" "));
  for (const p of points) {
    grid[p.y - minY][p.x - minX] = p.ch;
  }

  for (const row of grid) {
    console.log(row.join(""));
  }
}

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

async function fetchText(url) {
  if (typeof fetch === "function") {
    const res = await fetch(url);
    return await res.text();
  }
  return new Promise((resolve, reject) => {
    const https = require("https");
    https.get(url, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

// Example run:
decodeDoc("https://docs.google.com/document/d/e/2PACX-1vQiVT_Jj04V35C-YRzvoqyEYYzdXHcRyMUZCVQRYCu6gQJX7hbNhJ5eFCMuoX47cAsDW2ZBYppUQITr/pub");
