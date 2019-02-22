<!-- display page for a specific tag -->
<template>
  <MainLayout>
    <div class="section">
      <em>Les articles classés :</em>
      <h1 class="title is-1">{{$page.tag.name}}</h1>
      <Posts :posts="$page.posts.edges.map(e => e.node)"/>
    </div>
  </MainLayout>
</template> 

<script>
import MainLayout from "@/layouts/MainLayout"
import Posts from "@/components/Posts"
export default {
  components: { MainLayout, Posts },
  metaInfo() {
    return {
      title: this.$page.tag.title
    }
  }
}
</script>

<page-query>
  query Tag ($path: String!) {
    tag (path: $path) {
      name
      id
    }
    posts: allBlogPost {
      edges {
        node {
          title
          path
          content
          image
          date(format: "D MMMM, YYYY")
          tags {
            name
            id
            path
          }
        }
      }
    }
  }
</page-query>
