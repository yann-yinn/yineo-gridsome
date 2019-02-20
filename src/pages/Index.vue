<template>
  <Layout class="home">
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
  </Layout>
</template>

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

<style scoped>
.home >>> .heading {
  margin-bottom: 70px;
}
ul {
  list-style: none;
  padding: 0;
}
ul li {
  margin-bottom: 20px;
}
ul li a h2 {
  margin-bottom: 10px;
}
span {
  font-size: 80%;
  padding: 0;
}
ul li p:first-child {
  margin-top: 3px;
}
ul li p {
  margin: 0;
  line-height: 1.5;
}
</style>