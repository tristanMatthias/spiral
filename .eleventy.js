const excerpt = require('./_plugins/excerpt');
const tagList = require('./_shortcodes/tagList');
const htmlMetaCodes = require('./_shortcodes/seo');
const articleContent = require('./_filters/articleContent');


module.exports = function (eleventyConfig) {
  // Filter source file names using a glob

  eleventyConfig.addCollection("pages");

  eleventyConfig.addCollection("articles", function (collectionApi) {
    const files =  collectionApi.getFilteredByGlob("articles/**/*.md");
    return files.filter(a => !a.data.tags.includes('draft'));
  });

  ["intro", "beginner"].forEach(t =>
    eleventyConfig.addCollection(t, collectionApi => collectionApi.getFilteredByTag(t) )
  )

  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    strict_filters: true,
    root: ["layouts"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("./articles/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./articles/**/*.png");
  eleventyConfig.addPassthroughCopy("./articles/**/*.gif");
  eleventyConfig.addPlugin(excerpt);

  eleventyConfig.addShortcode('canonical', htmlMetaCodes.canonical);
  eleventyConfig.addShortcode('metaTitle', htmlMetaCodes.metaTitle);
  eleventyConfig.addShortcode('metaDescription', htmlMetaCodes.metaDescription);
  eleventyConfig.addShortcode('metaAuthor', htmlMetaCodes.metaAuthor);
  eleventyConfig.addShortcode('twitter', htmlMetaCodes.twitter);
  eleventyConfig.addShortcode('metaImage', htmlMetaCodes.image);

  eleventyConfig.addFilter("tagList", tagList);
  eleventyConfig.addFilter("articleContent", articleContent);
  eleventyConfig.addFilter("json", v => JSON.stringify(v[0].url));


  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};
