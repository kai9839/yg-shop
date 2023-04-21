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
    }
  },
  actions: {
    async getList ({ commit }) {
      const data = await findAllCategory()
      commit('setList', data.result)
    }
  }
}
