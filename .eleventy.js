const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  eleventyConfig.addPassthroughCopy({ "src/js": "/js" });

  // Eleventy no lee .yml/.yaml como datos globales por defecto — hay que registrarlo.
  eleventyConfig.addDataExtension("yml, yaml", (contents) => yaml.load(contents));

  eleventyConfig.addCollection("objetos", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/objetos/*.md").sort((a, b) => {
      return a.data.numero.localeCompare(b.data.numero);
    });
  });

  eleventyConfig.addFilter("estadoClass", function (estado) {
    return estado === "descontinuado" ? "discontinued" : "";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
