<template>
  <div class="container">
    <button @click="fn">发送请求</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup () {
    const fn = () => {
      request('/member/profile', 'get', { a: 10 })
    }
    return { fn }
  }
}
</script>

<style lang="less"></style>
