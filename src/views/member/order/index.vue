<template>
  <div class="ember-order-page">
    <XtxTabs v-model="activeName" @click-tab="clickTab">
      <xtxTabsPanel
      v-for="item in orderStatus"
      :key="item.name"
      :label="item.label"
      :name="item.name"
      >
        {{item.label}}
      </xtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import xtxTabsPanel from '@/components/library/xtx-tabs-panel.vue'
import { orderStatus } from '@/api/constants'
export default {
  components: { xtxTabsPanel },
  name: 'MemberOrderPage',
  setup () {
    const activeName = ref('all')
    const clickTab = (name) => {
      console.log(name)
    }
    return { activeName, clickTab, orderStatus }
  }
}

</script>
<style  lang="less" scoped>
</style>
