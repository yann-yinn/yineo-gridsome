<!-- main layout -->
<template>
  <div>
    <AppHeader/>
    <BulmaNavigation/>
    <div class="container">
      <slot />
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import BulmaNavigation from '~/components/BulmaNavigation'
import AppFooter from '~/components/AppFooter'

export default {
  components: { AppHeader, BulmaNavigation, AppFooter }
}
</script>
