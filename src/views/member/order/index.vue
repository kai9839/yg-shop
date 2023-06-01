<template>
  <div class="ember-order-page">
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="clickTab">
      <xtxTabsPanel
      v-for="item in orderStatus"
      :key="item.name"
      :label="item.label"
      :name="item.name"
      >
      </xtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list" v-if="orderList">
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <div v-else class="loading"></div>
    <!-- 分页组件 -->
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { findOrderList } from '@/api/order'
import OrderItem from './components/order-item'
import { orderStatus } from '@/api/constants'
export default {
  components: { OrderItem },
  name: 'MemberOrderPage',
  setup () {
    // 默认为全部订单
    const activeName = ref('all')
    // 点击选项卡
    const clickTab = (name) => {
      console.log(name)
    }
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 查询订单
    findOrderList(requestParams).then(data => {
      orderList.value = data.result.items
    })
    return { activeName, clickTab, orderStatus, orderList }
  }
}

</script>
<style  lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
