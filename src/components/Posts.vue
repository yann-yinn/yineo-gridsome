<!-- Post list as teasers -->
<template>
  <section class="posts section">
    <div v-for="post in posts" class="post" :key="post.slug">
      <div class="columns">
        <div class="column is-one-quarter">
          <g-image v-if="post.image" :src="post.image"/>
        </div>
        <div class="column">
          <g-link class="title is-3" :to="post.path">
            <h2 v-html="post.title"></h2>
          </g-link>
          <PostDate :date="post.date"/>

          <div class="content" v-html="striptags(post.content).substr(0, 300) + '...'"></div>

          <div>
            <BulmaButtonLink :to="post.path">Lire l'article</BulmaButtonLink>
          </div>
        </div>
      </div>
      <hr>
    </div>

    <!--<Pagination :totalPages="posts.totalPages"/>-->
  </section>
</template>

<script>
import striptags from "striptags";
import BulmaButtonLink from "./BulmaButtonLink";
import PostDate from "./PostDate";
export default {
  components: { BulmaButtonLink, PostDate },
  props: {
    posts: { type: Array, required: true }
  },
  methods: {
    striptags
  }
};
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
