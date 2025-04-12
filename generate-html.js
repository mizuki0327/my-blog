const fs = require('fs');
const path = require('path');
const marked = require('marked');

const articlesDir = path.join(__dirname, 'articles');
const templatePath = path.join(articlesDir, 'article_template.html');

const template = fs.readFileSync(templatePath, 'utf-8');

const mdFiles = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));

mdFiles.forEach(file => {
  const mdPath = path.join(articlesDir, file);
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const htmlContent = marked.parse(mdContent);

  // タイトルをMarkdownの最初の見出しから取得
  const titleMatch = mdContent.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : '無題';

  const finalHtml = template
    .replace('{{title}}', title)
    .replace('{{content}}', htmlContent);

  const htmlFileName = file.replace('.md', '.html');
  fs.writeFileSync(path.join(articlesDir, htmlFileName), finalHtml, 'utf-8');
  console.log(`✅ ${htmlFileName} を生成しました`);
});