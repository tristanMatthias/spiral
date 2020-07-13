const cheerio = require('cheerio');

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addShortcode('excerpt', template => {
      // return template.templateContent
      if (!template) return;
      if (template.data) {
        if (template.data.excerpt) return template.data.excerpt;
        if (template.data.seo && template.data.seo.description) return template.data.seo.description;
      }

      const $ = cheerio.load(template.templateContent);
      let text = $('p:first-of-type').contents().first().text();
      if (text.length > 140) text = text.slice(0, 140) + '…';
      return text
    });
  }
};
