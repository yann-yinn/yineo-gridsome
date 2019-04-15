// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head }) {
  head.description = "coucou";
  head.link.push(
    { rel: "stylesheet", href: "/css/bulma.css" },
    { rel: "stylesheet", href: "/css/app.css" }
  );
}
