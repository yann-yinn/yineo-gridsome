<!-- Post list as teasers -->
<template>
  <section class="posts section">
    <div v-for="post in posts" class="post" :key="post.$slug">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="image-wrapper has-text-centered">
            <img v-if="post.image" v-lazy="post.image">
          </div>
        </div>

        <div class="column">
          <nuxt-link class="title is-3" :to="{ name: 'blog-slug', params: { slug: post.$slug } }">
            <h2 v-html="post.title"></h2>
          </nuxt-link>
          <PostDate :date="post.$date"/>

          <div class="content" v-html="striptags(post.$html).substr(0, 300) + '...'"></div>

          <div>
            <BulmaButtonLink
              :to="{ name: 'blog-slug', params: { slug: post.$slug } }"
            >Lire l'article</BulmaButtonLink>
          </div>
        </div>
      </div>
      <hr>
    </div>

    <!--<Pagination :totalPages="posts.totalPages"/>-->
  </section>
</template>

<script>
import striptags from 'striptags'
import BulmaButtonLink from './BulmaButtonLink'
import Pagination from './Pagination'
import PostDate from './PostDate'
export default {
  components: { Pagination, BulmaButtonLink, PostDate },
  props: {
    posts: { type: Array, required: true }
  },
  methods: {
    striptags
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

.post {
  margin-bottom: 2rem;
}

.pagination-list {
  list-style-type: none;
}
</style>
