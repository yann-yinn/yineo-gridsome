// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(store => {
    // add some settings
    store.addMetaData("homepageTitle", "Yann Boisselier");
    store.addMetaData(
      "homepageSubtitle",
      "Consultant freelance Vue.js, API & JAMStack"
    );
    store.addMetaData(
      "homepageSubSubtitle",
      "Vue.js, GraphQL, Nuxt.js, Gridsome"
    );
  });
};
