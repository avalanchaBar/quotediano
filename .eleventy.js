const yaml = require("js-yaml");

const ICONS = {
    "local_fire_department": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M264-384q0 46 19.5 87.5T338-223q-1-5-1.5-10t-.5-10q0-27 10-50.5t27-42.5l107-120 107 120q17 20 27 43.5t10 49.5q0 5-.5 10.5T622-222q35-29 54.5-71.5T696-384q0-51-17.5-100.5T628-576q-17 11-35.5 17t-40.5 6q-52 0-91.5-32T411-668q-36 33-63 67.5T302-530q-19 36-28.5 73t-9.5 73Zm216 36-53 60q-9 11-14 22.5t-5 25.5q0 30 21 51t51 21q30 0 51-21t21-51q0-14-5-26t-14-22l-53-60Zm0-468v119q0 30 21 51t51 21q17 0 31.5-7t24.5-20l16-20q64 38 104 118.5T768-384q0 120-84 204T480-96q-120 0-204-84t-84-204q0-112 76-226.5T480-816Z"/></svg>`,
    "radio": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M168-96q-29.7 0-50.85-21.17Q96-138.34 96-168.07v-432.41q0-22.52 13.5-41.02Q123-660 144-668l539-196 25 68-342 124h425.96Q822-672 843-650.84t21 50.88v432.24Q864-138 842.85-117T792-96H168Zm0-72h624v-264H168v264Zm143.77-48Q352-216 380-243.77q28-27.78 28-68Q408-352 380.23-380q-27.78-28-68-28Q272-408 244-380.23q-28 27.78-28 68Q216-272 243.77-244q27.78 28 68 28ZM168-504h480v-72h72v72h72v-96H168v96Zm0 336v-264 264Z"/></svg>`,
    "checkroom": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M132-192q-15.3 0-25.65-11Q96-214 96-229.11q0-8.89 3.87-16.57 3.86-7.68 11.6-12.2L444-491v-73q0-15.3 11.12-25.65Q466.24-600 482-600q20 0 33-14.44t13-34.5q0-20.06-14-33.56-14-13.5-34-13.5t-34 14q-14 14-14 34h-72q0-50 35.2-85t85-35q49.8 0 84.8 34.62t35 84.2q0 40.18-23 72.68-23 32.5-61 43.5v42l332.53 234.04q7.74 4.54 11.6 12.25Q864-237 864-228q0 15.3-10.35 25.65Q843.3-192 828-192H132Zm114-72h468L480-428 246-264Z"/></svg>`,
    "content_cut": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M744-144 480-407l-87 88q8 16 11.5 32.85 3.5 16.86 3.5 33.71 0 65.44-45 110.94T252-96q-64.35 0-110.18-45.5Q96-187 96-252t45.5-110.5Q187-408 252.44-408q16.85 0 33.71 4Q303-400 319-392l88-87-88-88q-16 8-32.85 11.5-16.86 3.5-33.71 3.5-65.44 0-110.94-45.5T96-708q0-65 45.5-110.5T252-864q65 0 110.5 45.5T408-707.56q0 16.85-3.5 33.71Q401-657 393-641l471 469v28H744ZM595-520l-74-74 223-222h120v28L595-520ZM252.25-624q34.75 0 59.25-24.75t24.5-59.5q0-34.75-24.75-59.25t-59.5-24.5q-34.75 0-59.25 24.75t-24.5 59.5q0 34.75 24.75 59.25t59.5 24.5ZM480-456q9.6 0 16.8-7.2 7.2-7.2 7.2-16.8 0-9.6-7.2-16.8-7.2-7.2-16.8-7.2-9.6 0-16.8 7.2-7.2 7.2-7.2 16.8 0 9.6 7.2 16.8 7.2 7.2 16.8 7.2ZM252.25-168q34.75 0 59.25-24.75t24.5-59.5q0-34.75-24.75-59.25t-59.5-24.5q-34.75 0-59.25 24.75t-24.5 59.5q0 34.75 24.75 59.25t59.5 24.5Z"/></svg>`,
    "stylus": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M187-144q-20 4-33.5-10t-9.5-34l37-178 184 185-178 37Zm178-37L181-366l430-429q21-21 50.5-21t50.5 21l83 82q21 21 21 51t-21 51L365-181Zm296-563L271-353l82 82 391-390-83-83Z"/></svg>`,
    "directions_car": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-216v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9h-48q-10.2 0-17.1-6.9-6.9-6.9-6.9-17.1v-312l78-195q7-21 25.6-33t41.4-12h382q22.8 0 41.4 12 18.6 12 25.6 33l78 195v312q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9h-48q-10.2 0-17.1-6.9-6.9-6.9-6.9-17.1v-48H240Zm1-312h478l-48-120H289l-48 120Zm-25 72v168-168Zm96 132q20 0 34-14t14-34q0-20-14-34t-34-14q-20 0-34 14t-14 34q0 20 14 34t34 14Zm336 0q20 0 34-14t14-34q0-20-14-34t-34-14q-20 0-34 14t-14 34q0 20 14 34t34 14Zm-432 36h528v-168H216v168Z"/></svg>`,
    "link": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M432-288H288q-79.68 0-135.84-56.23Q96-400.45 96-480.23 96-560 152.16-616q56.16-56 135.84-56h144v72H288q-50 0-85 35t-35 85q0 50 35 85t85 35h144v72Zm-96-156v-72h288v72H336Zm192 156v-72h144q50 0 85-35t35-85q0-50-35-85t-85-35H528v-72h144q79.68 0 135.84 56.23 56.16 56.22 56.16 136Q864-400 807.84-344 751.68-288 672-288H528Z"/></svg>`,
    "push_pin": `<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m13.292 9.854 1.666 1.688v1.75h-4.104v5l-.875.875-.875-.875v-5H5v-1.75l1.667-1.688V4.25h-.834V2.5h8.292v1.75h-.833Zm-5.813 1.688h5l-.937-.917V4.25H8.417v6.375Zm2.5 0Z"/></svg>`,
    "tag": `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m264-192 30-120H144l18-72h150l42-168H192l18-72h162l36-144h72l-36 144h144l36-144h72l-36 144h156l-18 72H642l-42 168h168l-18 72H582l-30 120h-72l30-120H366l-30 120h-72Zm120-192h144l42-168H426l-42 168Z"/></svg>`,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  eleventyConfig.addPassthroughCopy({ "src/js": "/js" });

  // Eleventy no lee .yml/.yaml como datos globales por defecto — hay que registrarlo.
  eleventyConfig.addDataExtension("yml, yaml", (contents) => yaml.load(contents));

  // Iconos SVG propios (antes: Material Symbols de Google Fonts). Evita cargar
  // fuentes de terceros en el navegador del visitante.
  eleventyConfig.addFilter("icon", function (name) {
    return ICONS[name] || "";
  });

    eleventyConfig.addFilter("slug", function (str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

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
