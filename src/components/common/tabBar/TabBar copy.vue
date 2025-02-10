<template>
  <div>
    <!-- header -->
    <header class="header-default">
      <nav class="navbar navbar-expand-lg">
        <div class="container-xl">
          <!-- site logo -->
          <router-link target="_blank" :to="{ path: '/index' }">
            <h2 class="nav-item"
              style="background: linear-gradient(to right, red, gray);-webkit-background-clip: text;color: transparent;">
              考研交流平台</h2>
          </router-link>
          <div class="collapse navbar-collapse">
            <!-- menus -->
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown" :class="{ active: isAction == 1 }">
                <a class="nav-link dropdown-toggle" @click="goNewPage2('/')">首页</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="goNewPage1('/user/')">我的</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown" :class="{ active: isAction == 2 }">
                <router-link target="_blank" :to="{ path: '/article' }"><a
                    class="nav-link dropdown-toggle">Blog</a></router-link>
                <ul class="dropdown-menu">
                  <li>
                    <router-link target="_blank" :to="{ path: '/blogEdit/not_checkout' }"><a
                        class="dropdown-item">撰写博客</a></router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item" :class="{ active: isAction == 3 }">
                <router-link target="_blank" :to="{ path: '/forum' }"><a class="nav-link">Forum</a></router-link>
              </li>
              <li class="nav-item" :class="{ active: isAction == 3 }">
                <router-link target="_blank" :to="{ path: '/forum' }"><a class="nav-link">复习规划制定</a></router-link>
              </li>
              <li>
              <li class="nav-item" :class="{ active: isAction == 3 }">
                <router-link target="_blank" :to="{ path: '/forum' }"><a class="nav-link">经验分享交流</a></router-link>
              </li>
              <li>
              <li class="nav-item" :class="{ active: isAction == 3 }">
                <router-link target="_blank" :to="{ path: '/forum' }"><a class="nav-link">考研学校资讯</a></router-link>
              </li>
            </ul>
          </div>

          <!-- header right section -->
          <div class="header-right">
            <!-- social icons -->
            <ul class="social-icons list-unstyled list-inline mb-0">
              <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-github"></i></a></li>-->
              <li class="list-inline-item" v-if="!(this.avatarPath != null && this.avatarPath != '')">
                <a href=""><router-link :to="{ path: '/login' }">登录/注册</router-link></a>
              </li>
              <li class="list-inline-item" v-else>
                <a href=""><router-link :to="{ path: '/user/' + authorId }">
                    <Avatar
                      :src="avatarPath"
                      class="avatar" />
                  </router-link></a>
              </li>
            </ul>

            <!-- header buttons -->
            <div class="header-buttons">
              <button class="search icon-button" @click="toSearch">
                <i class="icon-magnifier"></i>
              </button>
              <button class="burger-menu icon-button" @click="logout">
                <!--                <span class="log-out-icon"></span>-->
                <Icon type="md-log-out" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <!--  搜索框  -->
    <div class="search-popup" :class="{ visible: isShowSearch }" @keyup.esc="cLoseShowSearch">
      <!-- close button -->
      <button type="button" class="btn-close" aria-label="Close" @click="cLoseShowSearch"></button>
      <!-- content -->
      <div class="search-content" @keyup.esc="cLoseShowSearch">
        <div class="text-center">
          <h3 class="mb-4 mt-0">Press ESC to close</h3>
        </div>
        <!-- form -->
        <div class="d-flex search-form">
          <input class="form-control me-2" v-model="searchInput" placeholder="Search and press enter ..."
            @keyup.enter="search" />
          <button class="btn btn-default btn-lg" @click="search"><i class="icon-magnifier"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie, getCookieAuthorId, getCookieAvatarPath } from "common/cookieUtils";

export default {
  name: "TabBar",
  props: {
    isAction: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isShowSearch: false,
      isTextShow: false,
      authorId: '',
      avatarPath: '',
      searchInput: '',
    }
  },

  created() {
    console.log(getCookieAvatarPath(), 'getCookieAvatarPath()')
    this.authorId = getCookieAuthorId();
    this.avatarPath = getCookieAvatarPath();
  },
  methods: {
    toSearch() {
      this.isShowSearch = true;
    },
    cLoseShowSearch() {
      this.isShowSearch = false;
      this.isTextShow = false;
    },

    goNewPage1(path) {
      if (!getCookie() || this.authorId == undefined || this.authorId == '') {
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
    goNewPage2(path) {
      if (!getCookie() || this.authorId == undefined || this.authorId == '') {
        this.$router.push("/login");
        return;
      }
      const { href } = this.$router.resolve({
        path: path,
        query: {
        },
      });
      window.open(href, "_blank")
    },
    logout() {
      console.log("logout");
      if (this.authorId == undefined || this.authorId == '') {
        this.$notify({
          message: '请先登录',
          type: 'warning'
        });
        return;
      }

      sessionStorage.clear();
      let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (let i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
      }
      this.$store.commit('checkLogin', false);
    },
    search() {
      const { href } = this.$router.resolve({
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
}</style>