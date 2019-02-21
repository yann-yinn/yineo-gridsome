<template>
  <PostLayout>
    <Post v-if="$page.post" :post="$page.post"/>
  </PostLayout>
</template>

<script>
import PostLayout from '@/layouts/PostLayout'
import Post from '@/components/Post'
export default {
  components: {
    PostLayout,
    Post 
  }
}
</script>

<page-query>
  query BlogPost ($path: String!) {
    post: blogPost (path: $path) {
      title
      date (format: "D MMMM, YYYY")
      content
      image
      tags {
        id
        name
      }
    }
  }
</page-query>
