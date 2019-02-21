<!-- Post list as teasers -->
<template>
  <div class="tags">
    <ul>
      <li class="tag is-medium is-light" v-for="tag in tags" :key="tag.$slug">
        <nuxt-link :to="{ name: 'tag-slug', params: { slug: tag.$slug } }">{{tag.name}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tags: { type: Array, require: true }
  }
}
</script>
