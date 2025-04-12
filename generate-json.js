const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'articles');
const outputFile = path.join(__dirname, 'articles.json');

const mdFiles = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));

const articles = [];

mdFiles.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const titleMatch = content.match(/^# (.+)$/m);
  const dateMatch = content.match(/日付：(.+)$/m);

  if (titleMatch && dateMatch) {
    articles.push({
      title: titleMatch[1].trim(),
      file: path.join('articles', file.replace('.md', '.html')),
      date: dateMatch[1].trim()
    });
  } else {
    console.warn(`⚠️ スキップ: ${file} に title または date が見つかりませんでした`);
  }
});

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`✅ 完了！${articles.length} 件の記事を articles.json に書き出しました。`);