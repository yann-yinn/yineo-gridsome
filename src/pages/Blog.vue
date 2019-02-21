<template>
  <MainLayout class="home">
    <ul>
      <li v-for="{ node } in $page.allBlogPost.edges" :key="node._id">
        <router-link :to="node.path">
          <h2 v-html="node.title"/>
        </router-link>
        <span v-html="node.date"/>
        <ul><li v-for="tag in node.tags" :key="tag.id">
          <router-link :to="tag.path">{{tag.name}}</router-link></li></ul>
      </li>
    </ul>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
export default {
  components: { MainLayout }
}
</script>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page) {
      edges {
        node {
          title
          path
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
