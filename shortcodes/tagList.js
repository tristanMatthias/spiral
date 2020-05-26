module.exports = (tags) => {
  if (!tags) return;
  const list = tags.map(t => {
    const tag = t.replace(/\s/, '-').toLowerCase();
    return `<a class="tag ${tag}" href="/tag/${tag}">${t}</a>`;
  }).join('');
  return `<div class="tags">${list}</div>`;
}
