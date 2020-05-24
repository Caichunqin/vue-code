<template>
  <header class="c-header">
    <div class="content">
      <div class="logo">
        <img class="img" src="../assets/logo.png" />
        <img class="text" src="../assets/logo-text.png" />
      </div>
      <div class="menus horizontal">
        <router-link
          tag="a"
          class="menu-item"
          :class="{ 'actived': activedPath === i.url }"
          :to="i.url"
          v-for="i in menus"
          :key="i.name">{{ i.name }}
        </router-link>
      </div>
      <div class="menus vertical">
        <div class="icon" @click.stop="showDropdownMenus = true">三</div>
        <div class="list" v-show="showDropdownMenus">
          <a
            class="menu-item"
            :class="{ 'actived': activedPath === i.url }"
            @click="toUrl(i.url)"
            v-for="i in menus"
            :key="i.name">{{ i.name }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      menus: [
        {
          url: '/home',
          name: '首页'
        },
        {
          url: '/resolution',
          name: '解决方案'
        },
        {
          url: '/ability',
          name: '行业能力'
        },
        {
          url: '/friends',
          name: '合作品牌'
        },
        {
          url: '/about',
          name: '关于我们'
        }
      ],
      showDropdownMenus: false
    }
  },
  computed: {
    ...mapState([ 'activedPath' ])
  },
  methods: {
    toUrl (url) {
      this.$router.push(url)
      this.hideDropdwonMenus()
    },
    hideDropdwonMenus () {
      this.showDropdownMenus = false
    }
  },
  mounted () {
    window.addEventListener('click', this.hideDropdwonMenus)
  },
  destroyed () {
    window.removeEventListener('click', this.hideDropdwonMenus)
  }
}
</script>

<style lang="scss">
.c-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 100;
  box-shadow: 0 2px 24px 5px rgba(13,37,62,.1);
  .content {
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
  .logo {
    margin-left: 50px;
    display: flex;
    align-items: center;
    .img {
      width: 35px;
      margin-right: 11px;
    }
    .text {
      width: 100px;
    }
  }
  .menus {
    &.horizontal {
      display: flex;
      line-height: 60px;
      margin-right: 50px;
      .menu-item {
        margin-left: 20px;
        color: inherit;
        &:hover {
          text-decoration: none;
        }
      }
    }
    &.vertical {
      position: relative;
      padding-right: 37px;
      line-height: 66px;
      text-align: right;
      font-weight: 700;
      width: 86px;
      .icon {
        cursor: pointer;
      }
      .list {
        position: absolute;
        left: 0;
        top: 90%;
        padding: 0 10px;
        width: 100%;
        text-align: center;
        background: #fff;
        border-top: 2px solid $blue;
        border-bottom: 2px solid $blue;
        .menu-item {
          display: block;
          height: 34px;
          line-height: 34px;
          font-weight: 400;
        }
      }
    }
    .menu-item {
      cursor: pointer;
      &.actived {
        color: $blue;
      }
    }
    @media (max-width:768px) {
      &.horizontal {
        display: none;
      }
    }
    @media (min-width: 768px) {
      &.vertical {
        display: none;
      }
    }
  }
}

</style>
