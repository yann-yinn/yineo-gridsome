<template>
  <MainLayout>
    <div class="article">
      <h1>{{ $page.tag.name }}</h1>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
export default {
  components: { MainLayout },
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
