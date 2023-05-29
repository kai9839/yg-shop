<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul  v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit()" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <XtxDialog title="切换收货地址" v-model:visible="dialogVisible" >
    <div class="itemContent">
      <div class="text item"
        :class="{active:selectedAddress&&item.id===selectedAddress.id}"
        @click="selectedAddress=item"
        v-for="item in list"
        :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
        </ul>
        <a @click="showDelete(item.id)" href="JavaScript:;" class="iconfont icon-close-new"></a>
        <XtxDialog title="删除地址信息" v-model:visible="deleteDialog">
          是否删除地址信息？
          <template v-slot:footer>
            <XtxButton @click="deleteDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
            <XtxButton @click="delAddress()" type="primary">确认</XtxButton>
          </template>
        </XtxDialog>
      </div>
    </div>
    <!-- vue3.0 仅支持v-slot+template写法 -->
    <template v-slot:footer>
      <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="confirmAddress" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
  <!-- 收货地址添加编辑组件 -->
  <AddressEdit @on-success="successHandler" ref="addressEdit" />
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit'
import { deleteAddress } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 收货地址列表
    list: {
      type: Array,
      // 默认值函数（() => []）是为了解决在Vue组件中使用对象或数组作为默认值的问题。
      // 使用() => []来提供一个空的并且独立的数组实例，以便于避免潜在的共享引用问题
      default: () => []
    }
  },
  // 1. 在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
  // 2. 如果你的组件渲染的代码片段，vue3.0规范，需要在emits中申明你所触发的自定义事件
  // 3. 提倡：你发了自定义事件，需要在emits选项申明下，代码可读性很高
  emits: ['change'],
  setup (props, { emit }) {
    // 控制删除地址弹窗
    const deleteDialog = ref(false)
    // 要删除的地址id
    let deleteId = ref(null)
    const showDelete = (id) => {
      deleteId = id
      deleteDialog.value = true
    }
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，使用第一条收货地址
    // 3. 如果没有数据，提示添加
    const showAddress = ref(null)
    if (props.list.length) {
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        if (props.list.length) {
        // 加上一个注释：忽略下面代码的检查eslint
        // eslint-disable-next-line vue/no-setup-props-destructure
          showAddress.value = props.list[0]
        }
      }
    }
    // 对话框显示隐藏
    const dialogVisible = ref(false)
    // 打开对话框
    const openDialog = () => {
      dialogVisible.value = true
      selectedAddress.value = null
    }
    // 确认地址
    const confirmAddress = () => {
      dialogVisible.value = false
      showAddress.value = selectedAddress.value
      // 默认通知一个地址ID给父
      emit('change', showAddress.value && showAddress.value.id)
    }
    // 选择的地址
    const selectedAddress = ref(null)
    // 添加收货地址组件
    const addressEdit = ref(null)
    const openAddressEdit = (address) => {
      // 添加 {}  修改 {数据}
      addressEdit.value.open(address)
    }
    // 删除
    const delAddress = () => {
      deleteAddress(deleteId).then(() => {
        Message({ type: 'success', text: '删除成功' })
        deleteDialog.value = false
        emit('change', deleteId, 'del')
        confirmAddress()
      })
    }
    // 成功
    const successHandler = (FormData) => {
      const editAddress = props.list.find(item => item.id === FormData.id)
      if (editAddress) {
        // 修改
        for (const key in editAddress) {
          editAddress[key] = FormData[key]
        }
      } else {
        // 添加
        // 将 formData 对象使用 JSON.stringify 方法转换为 JSON 字符串，
        // 然后再使用 JSON.parse 方法将其转换回一个新的 JavaScript 对象，
        // 这是为了防止对 props 中列表中的现有对象进行不必要的更改。
        const json = JSON.stringify(FormData) // 需要克隆下，不然使用的是对象的引用
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(json))
      }
    }
    return {
      showAddress,
      dialogVisible,
      selectedAddress,
      openDialog,
      confirmAddress,
      addressEdit,
      openAddressEdit,
      successHandler,
      delAddress,
      deleteDialog,
      showDelete
    }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  .itemContent {
    /* 添加滚动条 */
    max-height: 300px; /* 设置内容区域的最大高度，根据需要进行调整 */
    overflow-y: auto; /* 允许垂直方向上的内容溢出时显示滚动条 */
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      position: relative;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
      .iconfont {
        position: absolute;
        top: auto;
        right: 45px;
        text-align: center;
        &:hover {
          color: rgb(161, 157, 157);
        }
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
