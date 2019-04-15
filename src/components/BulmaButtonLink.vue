<template>
  <g-link
    class="button"
    :to="to"
    @click.native="isLoading = !isLoading"
    :class="[buttonClass, {'is-loading' : isLoading }]"
  >
    <slot></slot>
  </g-link>
</template>

<script>
export default {
  props: {
    buttonClass: { type: String, default: "is-primary" },
    to: { type: String | Array, default: "/" }
  },
  data() {
    return {
      isLoading: false
    };
  }
};
</script>

<style scoped>
.button {
  margin-top: 4vh;
}
</style>