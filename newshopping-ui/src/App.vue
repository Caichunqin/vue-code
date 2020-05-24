<template>
  <div id="app">
    <keep-alive :include="keepAlivedViews">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import keepAlivedViews from './shared/keepAlivedViews'

export default {
  data () {
    return {
      keepAlivedViews
    }
  }
}
</script>

<style lang="scss">

</style>
