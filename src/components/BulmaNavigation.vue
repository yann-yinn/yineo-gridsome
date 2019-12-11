<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item is-hidden-desktop">
          <img alt="Logo Yineo" src="/src/Yineo_logo_mobile.svg" class="logo-mobile" />
        </span>

        <div
          @click="mobileMenuIsOpened = !mobileMenuIsOpened"
          :class="{'is-active': mobileMenuIsOpened}"
          class="navbar-burger"
          data-target="app-menu"
        >
          <img alt="Logo Yineo" src="/src/Yineo_burger.svg" class="yineo-burger" />
        </div>
      </div>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div id="app-menu" class="navbar-menu" :class="{'is-active': mobileMenuIsOpened}">
        <div class="navbar-end">
          <g-link @click="mobileMenuIsOpened = false" to="/" class="navbar-item">Home</g-link>
          <g-link @click="mobileMenuIsOpened = false" to="/blog" class="navbar-item">Blog</g-link>
          <g-link @click="mobileMenuIsOpened = false" to="/cv" class="navbar-item">CV</g-link>
          <g-link
            @click="mobileMenuIsOpened = false"
            to="/popcorn-reseau-developpeurs-freelance-a-nantes"
            class="navbar-item"
          >🍿 Popcorn Nantes</g-link>
          <g-link @click="mobileMenuIsOpened = false" to="/contact" class="navbar-item">Contact</g-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuIsOpened: false
    };
  }
};
</script>

<style scoped>
.navbar-menu {
  border-style: solid;
  border-color: hsl(0, 0%, 98%);
  border-width: thin 0;
}

.navbar-end {
  margin: auto !important;
}

/* Create slide animation on mobile */

@media screen and (max-width: 1007px) {
  .navbar-item img {
    height: 2.75rem;
    max-height: 2.75rem;
  }

  .navbar-burger {
    cursor: pointer;
    display: block;
    height: 4rem;
    position: relative;
    width: 3.25rem;
    margin-left: auto;
  }

  .navbar-burger img {
    height: 2rem;
    margin: 1.25rem 0 0 0.6rem;
  }

  .navbar-end {
    padding: 0.5rem 1rem;
  }

  .navbar-menu {
    display: block;
    overflow: hidden;
    max-height: 0;
    padding: 0 1rem;
    transition: max-height 0.2s;
  }

  .navbar-menu.is-active {
    max-height: 100vh;
    transition: max-height 0.5s;
  }
}

.navbar-item {
  font-size: 1rem;
  padding: 1rem 2rem;
}

.nuxt-link-exact-active {
  color: #363636;
}
</style>
