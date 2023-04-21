<template>
  <nav>顶部组件</nav>
  <header>头部组件</header>
  <div class="main">
    <router-view></router-view>
  </div>
  <footer>底部组件</footer>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style  lang="less" scoped>
.main{
  .hoverShadow()
}
</style>
