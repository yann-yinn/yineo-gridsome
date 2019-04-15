<template>
  <div>
    <div class="columns">
      <div class="column is-one-third">
        <g-image v-if="post.image" :src="post.image"/>
      </div>
      <div class="column">
        <h2 v-html="post.title"></h2>
        <PostDate :date="post.date"/>
        <div class="content" v-html="striptags(post.content).substr(0, 200) + '...'"></div>
        <div>
          <BulmaButtonLink :to="post.path">Lire l'article</BulmaButtonLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import striptags from "striptags";
import BulmaButtonLink from "./BulmaButtonLink";
import PostDate from "./PostDate";
export default {
  components: { BulmaButtonLink, PostDate },
  props: {
    post: { type: Object, default: () => {} }
  },
  methods: {
    striptags
  }
};
</script>