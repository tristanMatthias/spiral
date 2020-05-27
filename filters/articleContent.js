module.exports = (content) => {
  if (!content) return;
  let data = content;
  const colors = [
    'Beige',
    'Purple',
    'Red',
    'Blue',
    'Orange',
    'Green',
    'Yellow',
    'Turquoise',
    'Coral'
  ];

  colors.forEach(c => {
    const r = new RegExp(`\\b${c}\\b`, 'g');
    data = data.replace(r, `<span class="color ${c.toLowerCase()}">${c}</span>`)
  })
  return data;
}
