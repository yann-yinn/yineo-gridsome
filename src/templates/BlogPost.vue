<template>
  <MainLayout>
    <div class="article">
      <h1>{{ $page.blogPost.title }}</h1>
      <span>{{ $page.blogPost.date }}</span>
      <img :src="$page.blogPost.fields.image">
      <div class="content" v-html="$page.blogPost.content"/>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
export default {
  components: { MainLayout },
  metaInfo() {
    return {
      title: this.$page.blogPost.title
    }
  }
}
</script>

<page-query>
  query BlogPost ($path: String!) {
    blogPost (path: $path) {
      title
      date (format: "D MMMM, YYYY")
      content
      fields {
        image
      }
    }
  }
</page-query>
