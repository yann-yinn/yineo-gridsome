<!-- Display a full post object -->
<template>
  <div>
    <div class="container is-fluid">
      <section class="hero hero-title is-bold">
        <div class="hero-body" v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">
          <h1 class="title is-1" v-html="post.title"></h1>
        </div>
      </section>
    </div>

    <div class="container is-narrow">
      <section class="post section">
        <PostDate :date="post.$date"/>
        <div v-html="post.$html" class="content"></div>
        <TagLinks v-if="post.tags" :tags="post.tags"/>
      </section>
    </div>
  </div>
</template>

<script>
import PostDate from './PostDate'
import TagLinks from './TagLinks'
import tags from 'static/api/tags.json'
export default {
  components: { PostDate, TagLinks },
  props: {
    post: { type: Object, default: {} }
  }
}
</script>

<style scoped>
.hero-title .hero-body {
  padding: 4rem 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero-title .title {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>
