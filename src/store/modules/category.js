import { findAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    },
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const data = await findAllCategory()
      // 给每个分类加上控制二级分类显示隐藏的open属性
      data.result.forEach(top => {
        top.open = false
      })
      commit('setList', data.result)
    }
  }
}
