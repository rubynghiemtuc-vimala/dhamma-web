export default function (eleventyConfig) {
  // Static passthrough
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "media": "media" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    pathPrefix: "/dhamma-web/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
