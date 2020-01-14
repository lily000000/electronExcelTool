import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      token:'',
      httpProtocol:'',
    },//唯一数据源，我理解为声明全局变量
    getters:{
        token: state => state.token,
    },//针对state数据的过滤，
    mutations: {

        token (state, flag){
            state.token = flag;
        },
        httpProtocol(state,flag){
            state.httpProtocol = flag;
        }
    }//逻辑处理，但Mutation 必须是同步函数改变store的状态—（状态的唯一方法是提交 ）
  })

  //创建一个对象来保存应用启动时的初始状态
// export default new Vuex.Store({
//     store
//     // strict: process.env.NODE_ENV !== 'production', // 严格模式
//   });
export default store