<template>
  <div class="container">
    {{ $store.state.user.profile }}
    {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser', { account: 'zhangsan' })">修改用户信息</button>
  </div>
</template>

<style lang="less"></style>
