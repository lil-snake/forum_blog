<template>
  <div>
    <!-- header -->
    <header class="header-default" style="background-color: seashell;">
      <nav class="navbar navbar-expand-lg">
        <div class="container-xl">
          <!-- site logo -->
          <router-link target="_blank" :to="{path:'/index'}">
            <h2 class="nav-item" style="background: linear-gradient(to right, red, gray);-webkit-background-clip: text;color: transparent;">考研规划与交流后台管理系统</h2>
          </router-link>
          <!-- header right section -->
          <div class="header-right">

            <!-- header buttons -->
            <div class="header-buttons">
              <button class="burger-menu icon-button" @click="logout">
<!--                <span class="log-out-icon"></span>-->
                <Icon type="md-log-out" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-12">
          <Tabs @on-click="clickHandle" v-loading="loading">
            <TabPane label="文章管理" icon="ios-book" name="myBlog">
              <div class="span-text" v-if="personalArticleList != null && personalArticleList.length == 0">
                  没有数据
              </div>
              <div v-else>
                <div class="padding-30 rounded bordered">
                  <div class="row">
                    <LatestPostsItem2 v-for="(itemData,index) in personalArticleList" :key="index"
                                      :item="itemData"></LatestPostsItem2>
                  </div>
                </div>
                <div class="space"></div>
                <div class="box-line"></div>
                <div class="space"></div>
                <div class="text-center">
                  <Page :total="total" :page-size="6" @on-change="change" show-elevator/>
                </div>
              </div>
            </TabPane>
            <TabPane label="用户管理" icon="ios-person" name="personalInfo">
              <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
              >
                <el-table-column align="center" label="序号" width="95">
                  <template slot-scope="scope">
                    {{ scope.$index+1 }}
                  </template>
                </el-table-column>
                <el-table-column label="账号" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.username }}
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.nickName }}
                  </template>
                </el-table-column>
               <el-table-column label="角色" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.role =='2'">教师</span>
                    <span v-else>学生</span>
                  </template>
                </el-table-column>
                <el-table-column label="注册时间" align="center"  width="200px">
                  <template slot-scope="scope">
                    {{ scope.row.createTime }}
                  </template>
                </el-table-column>
                <el-table-column label="简介" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.personalProfile }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.deleted =='0'" style="color:green">启用</span>
                    <span v-else style="color:red">禁用</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                  <template slot-scope="{row}">
                    <el-button v-if="row.status!='deleted'" icon="el-icon-delete" size="mini" type="danger" @click="deleteUser(row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="space"></div>
              <div class="box-line"></div>
              <div class="space"></div>
              <div class="text-center">
                <Page :total="userTotal" :page-size="6" @on-change="userChange" show-elevator/>
              </div>
            </TabPane>
          </Tabs>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar";
import Blogger from "components/common/blogger/Blogger";
import PostTabs from "components/content/featured/PostTabs";
import Celebration from "components/content/celebration/Celebration";
import PickCecommended from "components/content/main/PickCecommended";
import LatestPostsItem2 from "components/common/latestPosts/LatestPostsItem2";
import {getCookie, getCookieAuthorId, getCookieAvatarPath,removeCookie,removeCookieAuthorId,removeCookieAvatarPath} from "common/cookieUtils";
import {getPersonalArticle} from "network/article";
import {getAllUser,deleteUser} from "network/userInfo";

export default {
  name: "TabBar",
  components: {
      TabBar,
      PostTabs,
      Celebration,
      Blogger,
      PickCecommended,
      LatestPostsItem2
    },
  props: {
    isAction: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      curPage: 1,
      size: 6,
      isMy: false,//用于判断是否是自己的页面。默认不是
      personalInfoLoad: false,
      loading: false,
      personalArticleList: [],
      total: 0,
      isShowSearch: false,
      isTextShow: false,
      authorId: '',
      avatarPath: '',
      searchInput: '',
      name: '',
      ruleValidate: {},
      listQuery: {
        page: 1,
        limit: 20,
        username: '',
        fullname: '',
        sort: '+id'
      },
      list:null,
      userTotal: 0,
      listLoading: true,
    }
  },
  created() {
    this.authorId = getCookieAuthorId();                     //session存放的id,登录id
    if(this.authorId == undefined || this.authorId == ''){
        this.$router.push("/adminLogin");
        return;
    }
    this.sendPersonalBlog();
    this.getAllUser();
  },
  methods: {
    sendPersonalBlog() {
      getPersonalArticle(this.curPage, this.size, "admin").then(res => {
        // console.log(res);
        this.personalArticleList = res.data.data;
        this.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      })
    },
    getAllUser() {
      debugger
      getAllUser(this.curPage, this.size).then(res => {
        debugger
        // console.log(res);
        this.list = res.data.data;
        this.userTotal = res.data.total;
      }).finally(() => {
        this.loading = false;
      })
    },
    clickHandle(name) {
        // console.log(name);
        debugger
        if (name == 'personalInfo') {
          if (!this.personalInfoLoad) {
            //还没加载

            // 加载好了，第二次点击不再发送请求
            this.personalInfoLoad = true;
          }
        } else if (name == 'post') {
          if (!this.isPostLoad) {
            //还没加载
            getPersonal(1,6,this.authorId).then(res => {
              this.itemDataList = res.data.data;
              this.postTotal = res.data.total;
            }).finally(() => {
              this.postLoading = false;
            })

            // 加载好了，第二次点击不再发送请求
            this.isPostLoad = true;
          }
        }else if (name == 'setting') {
          if (!this.settingLoad) {
            //还没加载


            // 加载好了，第二次点击不再发送请求
            this.settingLoad = true;
          }
        }
      },
    deleteUser(row){
      const authorId = row.authorId
      deleteUser(authorId).then(res => {
       if(res.data==1){
         this.$notify({
          message: '用户删除成功',
          type: 'success'
        });
        this.getAllUser()
       }
      })
    },
    loadMore() {
      if (this.curPage * this.size >= this.total) {
        this.$notify({
          title: '消息提醒',
          message: '没有更多的数据了',
          type: 'success'
        });
        return;
      }
      this.curPage++;
      getPersonalArticle(this.curPage, this.size, this.authorId).then(res => {
        // console.log(res);
        this.personalArticleList.push(...res.data.data);
        this.total = res.data.total;
      })
    },
    change(current) {
        getPersonalArticle(current, 6,"admin").then(res => {
          this.personalArticleList = res.data.data;
          this.total = res.data.total;
        })
      },
    userChange(current) {
      getAllUser(current, 6).then(res => {
        this.list = res.data.data;
        this.userTotal = res.data.total;
      })
      },
    toSearch() {
      this.isShowSearch = true;
    },
    cLoseShowSearch() {
      this.isShowSearch = false;
      this.isTextShow = false;
    },

    goNewPage1(path){
      if (!getCookie()||this.authorId == undefined || this.authorId == ''){
        this.$router.push("/login");
        return;
      }
      const { href } = this.$router.resolve({
        path: path + this.authorId,
        query: {
        },
      });
      window.open(href, "_blank")
    },
    goBlogAdd(path){
      if (!getCookie()||this.authorId == undefined || this.authorId == ''){
        this.$router.push("/login");
        return;
      }else{
        this.$router.push(path);
        return;
      }
    },
    logout(){
      debugger
      console.log("logout");
      if (!getCookie()||this.authorId == undefined || this.authorId == ''){
        this.$notify({
          message: '请先登录',
          type: 'warning'
        });
        return ;
      }

      sessionStorage.clear();
      let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
        for(let i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
      }

      this.$notify({
        title: '消息提醒',
        message: '注销成功',
        type: 'success'
      });
      this.avatarPath='';
      this.authorId = ''
      removeCookie()
      removeCookieAuthorId()
      removeCookieAvatarPath()
      this.$router.push("/adminLogin");
      return;
    },
    search(){
      const {href} = this.$router.resolve({
        path: "/searchResult/" + this.searchInput,
        query: {},
      });
      window.open(href, "_blank")
    }

  }
}
</script>

<style scoped>
.logo-image {
  width: 200px;
}

.avatar:hover {
  width: 50px;
  height: 50px;
  transition: all 500ms;
}
</style>