const cheerio = require('cheerio');

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addShortcode('excerpt', template => {
      // return template.templateContent
      if (!template) return;
      if (template.data && template.data.excerpt) {
        return template.data.excerpt;
      }

      const $ = cheerio.load(template.templateContent);
      let text = $('p:first-of-type').contents().first().text();
      if (text.length > 140) text = text.slice(0, 140) + '…';
      return text
    });
  }
};
