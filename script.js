fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('article-list');
    data.forEach(article => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = article.file;
      a.textContent = `${article.title} (${article.date})`;
      li.appendChild(a);
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('記事一覧の読み込みに失敗しました:', error);
  });