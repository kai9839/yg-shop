<template>
  <AppTopnav>顶部组件</AppTopnav>
  <AppHeader>头部组件</AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <div class="app-body">
    <router-view></router-view>
  </div>
  <AppFooter>底部组件</AppFooter>
</template>

<script>
import { useStore } from 'vuex'
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
