<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <router-view/>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  watch: {
    '$route' (to) {
      this.setActivedPath(this.$route.path)
    }
  },
  methods: {
    ...mapMutations([ 'setActivedPath' ])
  },
  mounted () {
    this.setActivedPath(this.$route.path)
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
.main {
  padding-top: 60px;
}
p {
  margin-bottom: 0;
}
</style>
