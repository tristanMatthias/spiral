// TODO: Update this
const domain = "https://perspective.com";

module.exports.canonical = (url) => `
<link rel="canonical" href="${domain}${url}" />
<meta property="og:url" content="${domain}${url}">
<meta property="twitter:url" content="${domain}${url}">
`;

module.exports.metaTitle = (title, d) => `
<title>${title || d}</title>
<meta property="og:title" content="${title ||d}">
<meta property="twitter:title" content="${title ||d}">
`;

module.exports.metaDescription = (description, d) => `
<meta name="description" content="${description || d}" />
<meta property="og:description" content="${description || d}" />
<meta property="twitter:description" content="${description || d}" />
`;

module.exports.twitter = (twitter, d) => `
<meta name="twitter:site" content="@${twitter || d}">
`;

module.exports.image = (image, d) => `
<meta name="og:image" content="${image || d}">
<meta name="twitter:image" content="${image || d}">
`;

module.exports.metaAuthor = (authorUrl, d) => `<link rel="author" href="${authorUrl || d}" />`;
