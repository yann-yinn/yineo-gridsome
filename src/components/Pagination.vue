<template>
  <nav v-if="totalPages > 1" class="pagination is-centered">
    <ul class="pagination-list">
      <li :key="n" v-for="n in totalPages">
        <g-link class="pagination-link" :to="{ name: getRouteName, query:{ page: n } }">{{ n }}</g-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: { type: Number, default: 1 }
  },
  data() {
    return {
      routeName: { type: String, default: "" }
    };
  },
  computed: {
    getRouteName() {
      return this.$route.name;
    }
  }
};
</script>
