const excerpt = require('eleventy-plugin-excerpt');
const pluginSEO = require("eleventy-plugin-seo");


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
  // eleventyConfig.addPlugin(pluginSEO);
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Foobar Site",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "https://foo.com",
    author: "Jane Doe",
    twitter: "username",
    image: "foo.jpg"
  });


  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPlugin(excerpt, );

  const htmlMetaCodes = require('./shortcodes/seo');

  eleventyConfig.addShortcode('canonical', htmlMetaCodes.canonical);
  eleventyConfig.addShortcode('metaTitle', htmlMetaCodes.metaTitle);
  eleventyConfig.addShortcode('metaDescription', htmlMetaCodes.metaDescription);
  eleventyConfig.addShortcode('metaAuthor', htmlMetaCodes.metaAuthor);
  eleventyConfig.addShortcode('twitter', htmlMetaCodes.twitter);
  eleventyConfig.addShortcode('metaImage', htmlMetaCodes.image);


  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};
