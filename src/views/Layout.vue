<template>
  <AppTopnav>顶部组件</AppTopnav>
  <AppHeader>头部组件</AppHeader>
  <div class="main">
    <router-view></router-view>
  </div>
  <AppFooter>底部组件</AppFooter>
</template>

<script>
import { useStore } from 'vuex'
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.main {
  .hoverShadow();
  background: @xtxColor;
}
</style>
