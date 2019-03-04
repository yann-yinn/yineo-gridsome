// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Yineo - développeur freelance à Nantes spécialisé Vue.js, Nuxt, Gridsome, GraphQL',
  homepageTitle: 'Yann Boisselier',
  homepageSubtitle: 'développeur freelance à Nantes spécialisé Vue.js, Nuxt, Gridsome, GraphQL',
  mail: 'yann@yineo.fr',
  telephone: '06 32 70 37 58',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/*.md',
        typeName: 'BlogPost',
        route: '/post/:slug',
        refs: {
          tags: 'Tag',
        },
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/tags/*.md',
        typeName: 'Tag',
        route: '/tag/:id'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/blocks/*.md',
        typeName: 'Block'
      }
    }
  ]
}
