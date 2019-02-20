<template>
  <Layout>
    <div class="article">
      <h1>{{ $page.tag.name }}</h1>
      <!--<span>{{ $page.blogPost.date }}</span>-->
    </div>
  </Layout>
</template>

<script>
export default {
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
  }
</page-query>
