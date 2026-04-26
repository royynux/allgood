const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'ARCHITECTURE.md');
const output = path.join(__dirname, 'ARCHITECTURE.html');
const md = fs.readFileSync(input, 'utf8');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

function inlineMd(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderMarkdown(source) {
  const lines = source.split(/\r?\n/);
  const html = [];
  let inCode = false;
  let codeLang = '';
  let codeLines = [];
  let inList = false;
  let paragraph = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMd(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!inList) return;
    html.push('</ul>');
    inList = false;
  }

  function flushCode() {
    html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    codeLines = [];
    codeLang = '';
  }

  for (const line of lines) {
    const codeMatch = line.match(/^```(.*)$/);
    if (codeMatch) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        closeList();
        inCode = true;
        codeLang = codeMatch[1].trim();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMd(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^\s*-\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inlineMd(bullet[1])}</li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  if (inCode) flushCode();
  return html.join('\n');
}

const body = renderMarkdown(md);
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>All Good Adventure Architecture</title>
<style>
@page { size: A4; margin: 18mm 16mm; }
* { box-sizing: border-box; }
body {
  margin: 0;
  color: #172033;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
}
h1, h2, h3, h4, h5, h6 {
  color: #0f1b2d;
  line-height: 1.2;
  page-break-after: avoid;
}
h1 {
  font-size: 25pt;
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 3px solid #e8490f;
}
h2 {
  font-size: 17pt;
  margin: 28px 0 10px;
  padding-top: 6px;
  border-top: 1px solid #dfe4ea;
}
h3 { font-size: 13pt; margin: 20px 0 8px; }
h4 { font-size: 11.5pt; margin: 16px 0 6px; }
p { margin: 7px 0 10px; }
ul { margin: 6px 0 12px 20px; padding: 0; }
li { margin: 3px 0; }
pre {
  margin: 10px 0 14px;
  padding: 12px 14px;
  background: #f6f7f9;
  border: 1px solid #dfe4ea;
  border-left: 4px solid #e8490f;
  border-radius: 6px;
  white-space: pre-wrap;
  page-break-inside: avoid;
}
code {
  font-family: Consolas, "Courier New", monospace;
  font-size: 9.3pt;
}
p code, li code {
  background: #fff0eb;
  color: #c93d0a;
  padding: 1px 4px;
  border-radius: 4px;
}
strong { color: #0f1b2d; }
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(output, doc, 'utf8');
console.log(output);
