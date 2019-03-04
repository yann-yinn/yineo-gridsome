<!-- Post list as teasers -->
<template>
  <div class="tags">
    <ul>
      <li class="tag is-medium is-light" v-for="tag in tags" :key="tag.id">
        <g-link :to="tag.path">{{tag.name}}</g-link>
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
