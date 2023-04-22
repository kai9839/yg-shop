<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in meneList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink
          v-for="sub in item.children"
          :key="sub.id"
          :to="`/category/sub/${sub.id}`">
          {{ sub.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }]
    })
    const store = useStore()
    const meneList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })
    return { meneList }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
