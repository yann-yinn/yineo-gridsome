// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/posts/*.md",
        typeName: "BlogPost",
        route: "/post/:slug",
        refs: {
          tags: "Tag"
        },
        remark: {
          plugins: [["gridsome-plugin-remark-shiki", { theme: "nord" }]]
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/tags/*.md",
        typeName: "Tag",
        route: "/tag/:id"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/*.md",
        typeName: "Block"
      }
    }
  ]
};
