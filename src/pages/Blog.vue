<template>
  <MainLayout class="home">
    <Posts :posts="$page.allBlogPost.edges.map(e => e.node)"/>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
import Posts from '@/components/Posts.vue'
export default {
  components: { MainLayout, Posts }
}
</script>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page) {
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
