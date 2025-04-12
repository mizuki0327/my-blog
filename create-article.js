const fs = require('fs');
const path = require('path');

const [ , , title, date ] = process.argv;

if (!title || !date) {
  console.error('❌ 使い方: node create-article.js "記事タイトル" "YYYY-MM-DD"');
  process.exit(1);
}

const filename = `article-${date}.md`;
const filepath = path.join(__dirname, 'articles', filename);

if (fs.existsSync(filepath)) {
  console.error(`⚠️ ${filename} はすでに存在します。`);
  process.exit(1);
}

const mdContent = `# ${title}

ここに本文を書いてください。

日付：${date}
`;

fs.writeFileSync(filepath, mdContent, 'utf-8');
console.log(`✅ ${filename} を作成しました`);