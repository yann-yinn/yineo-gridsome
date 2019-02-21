<template>
  <footer class="footer">
    <div class="container">
      <div class="powered-by has-text-centered">
        <em>Ce site est propulsé par :</em>
      </div>
      <div class="columns has-text-centered">
        <div class="column">
          <div class="logo-image-wrapper">
            <img class="logo-image" src="/images/logo-gridsome.png">
          </div>
          <div class="logo-title">
            <a href="https://gridsome.org">GRIDSOME</a>
          </div>
          <div class="logo-description">Vue.js JAMStack Framework</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.logo-title {
  font-weight: bold;
  margin: auto;
  text-transform: uppercase;
}

.logo-image-wrapper {
  height: 100px;
}

.logo-image {
  max-height: 100px;
}

.powered-by {
  margin-bottom: 2rem;
}
</style>
