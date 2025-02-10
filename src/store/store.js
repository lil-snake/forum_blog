import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkLogin: false,  // 登录状态，默认我未登录
    // 登录人信息
    authorInfo: {
      authorId: '',
      nickName: '',
      avatarPath: '',
      role: '',
      token: ''
    }
  },
  mutations: {
    //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    set(state,authorInfo){
      // state默认自带
      // console.log(authorInfo);
      if (authorInfo.authorId != null && authorInfo.authorId != undefined && authorInfo.authorId != ''){
        state.authorInfo.authorId = authorInfo.authorId;
      }
      if (authorInfo.nickName != null && authorInfo.nickName != undefined && authorInfo.nickName != ''){
        state.authorInfo.nickName = authorInfo.nickName;
      }
      if (authorInfo.avatarPath != null && authorInfo.avatarPath != undefined && authorInfo.avatarPath != ''){
        state.authorInfo.avatarPath = authorInfo.avatarPath;
      }
      if (authorInfo.role != null && authorInfo.role != undefined && authorInfo.role != ''){
        state.authorInfo.role = authorInfo.role;
      }
      if (authorInfo.token != null && authorInfo.token != undefined && authorInfo.token != ''){
        state.authorInfo.token = authorInfo.token;
      }
      sessionStorage.setItem("store",JSON.stringify(state));
      // console.log(state.authorInfo);
    },
    checkLogin(state, status){
      if (status){
        // 登录了
        state.checkLogin = status;
      }else {
        // 退出登录
        state.checkLogin = status;
        state.authorInfo.authorId = '';
        state.authorInfo.nickName = '';
        state.authorInfo.avatarPath = '';
        state.authorInfo.token = '';
      }
      sessionStorage.setItem("store",JSON.stringify(state));
    }
  },
  actions: {
    //最主要是做异步操作,暂时用不到
  }
})
