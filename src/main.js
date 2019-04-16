// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head }) {
  // Add a meta tag
  head.meta.push({
    name: "description",
    content: "Consultant freelance JAMStack, Vue.js, API"
  });
  head.meta.push({
    name: "keywords",
    content: "Vue.js, JAMStack, Nuxt.js, Gridsome, APIs, GraphQL"
  });
  head.link.push(
    { rel: "stylesheet", href: "/css/bulma.css" },
    { rel: "stylesheet", href: "/css/app.css" }
  );
}
