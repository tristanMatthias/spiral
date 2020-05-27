const excerpt = require('./plugins/excerpt');
const tagList = require('./shortcodes/tagList');
const articleContent = require('./filters/articleContent');


module.exports = function (eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi.getFilteredByGlob("articles/**/*.md");
  });

  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    strict_filters: true,
    root: ["_layouts"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("./articles/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./articles/**/*.png");
  eleventyConfig.addPassthroughCopy("./articles/**/*.gif");
  eleventyConfig.addPlugin(excerpt);

  const htmlMetaCodes = require('./shortcodes/seo');

  eleventyConfig.addShortcode('canonical', htmlMetaCodes.canonical);
  eleventyConfig.addShortcode('metaTitle', htmlMetaCodes.metaTitle);
  eleventyConfig.addShortcode('metaDescription', htmlMetaCodes.metaDescription);
  eleventyConfig.addShortcode('metaAuthor', htmlMetaCodes.metaAuthor);
  eleventyConfig.addShortcode('twitter', htmlMetaCodes.twitter);
  eleventyConfig.addShortcode('metaImage', htmlMetaCodes.image);

  eleventyConfig.addFilter("tagList", tagList);
  eleventyConfig.addFilter("articleContent", articleContent);


  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};
