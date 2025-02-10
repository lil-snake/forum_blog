<template>
  <!-- featured post large -->
  <div>
    <div class="post featured-post-lg" @click="toDetail">
      <div class="details clearfix">
        <a href="#" class="category-badge">推荐</a>
        <h2 class="post-title">
          <div class="title mouse-hand" ><router-link target="_blank" :to="{path:'/blog/' + articleInfo.articleId}">{{articleInfo.title}}</router-link></div>
        </h2>
        <ul class="meta list-inline mb-0">
          <li class="list-inline-item"><a ><router-link target="_blank" :to="{path:'/user/' + articleInfo.articleId}">{{articleInfo.nickName}}</router-link></a></li><!-- 这里的链接再处理 -->
          <li class="list-inline-item">{{articleInfo.modifiedTime}}</li>
        </ul>
      </div>
      <div class="mouse-hand">
        <div class="thumb rounded">
          <div class="inner data-bg-image">
            <img :src="articleInfo.coverPath" v-if="articleInfo.coverPath != null && articleInfo.coverPath != ''" alt="">
            <img src="http://image.fangweb.top/Fo4-FM1LJ-m5gjUL-ehNIVnfe0zs" v-else alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPopular} from 'network/article'

export default {
  name: "FeaturedPostLarge",
  props: {},
  data() {
    return {
      articleInfo: {
        articleId: '',
        authorId: '',
        briefIntroduction: '',
        modifiedTime: '',
        title: '',
        nickeName: '',
      }
    }
  },
  created() {
    this.getPopularFromServer();
  },
  methods: {
    getPopularFromServer() {
      // console.log('asdsadfas');
      getPopular(1).then(res => {
        this.articleInfo = res.data[0];
        // console.log(this.articleInfo);
      })
    },
    toDetail() {
      // this.$router.push('/blog/' + this.articleInfo.articleId);
      const {href} = this.$router.resolve({
        path: "/blog/" + this.articleInfo.articleId,
        query: {},
      });
      window.open(href, "_blank")
    }
  }
}
</script>

<style scoped>
.post-title .title {
  color: white;
}
.mouse-hand{
  cursor:pointer;
}
</style>