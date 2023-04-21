<template>
  <AppTopnav>顶部组件</AppTopnav>
  <header>头部组件</header>
  <div class="main">
    <router-view></router-view>
  </div>
  <footer>底部组件</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
export default {
  name: 'Layout',
  components: { AppTopnav }
}
</script>

<style lang="less" scoped>
.main {
  .hoverShadow();
  background: @xtxColor;
}
</style>
