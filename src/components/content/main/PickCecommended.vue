<template>
  <div>
    <!-- post -->
    <div class="post">
      <div class="thumb rounded">
      </div>
      <ul class="meta list-inline mt-4 mb-0">
        <li class="list-inline-item">
          <a href="#">
            <img :src="pickData.coverPath" class="author" alt="cover" v-if="pickData.coverPath != null && pickData.coverPath != ''"/>
            <img src="http://image.fangweb.top/featured-lg.jpg" class="author" alt="cover" v-else/>
          </a>
        </li>
      </ul>

      <ul class="meta list-inline mt-4 mb-0">
        <li class="list-inline-item" @click="toPersonal(pickData.authorId)">
          <a ><img :src="pickData.avatarPath" class="author avatar" alt="author"/>{{ pickData.nickName }}</a>
        </li>
        <li class="list-inline-item">{{ pickData.modifiedTime }}</li>
      </ul>
      <h5 class="post-title mb-3 mt-3"><a><router-link target="_blank" :to="{path:'/blog/' + pickData.articleId}">{{ pickData.title }}</router-link></a></h5>
      <p class="excerpt mb-0">{{ pickData.briefIntroduction }}</p>
    </div>
  </div>
</template>

<script>
import {getPopularPaging} from "network/article";
export default {
  name: "PickCecommended",
  props: {
    pickData: {
      articleId: '',
      authorId: '',
      title: '',
      hrefLink: '',
      coverPath: '',
      avatarPath: '',
      nickName: '',
      modifiedTime: '',
      briefIntroduction: '',
    }
  },
  data() {
    return{
      // pickData: {
      //   articleId: '',
      //   authorId: '',
      //   title: '',
      //   hrefLink: '',
      //   imgLink: '',
      //   authorImg: '',
      //   nickName: '',
      //   modifiedTime: '',
      //   briefIntroduction: '',
      // }
    }
  },
  created() {
    // this.getPickEdict();
  },
  methods: {
    // getPickEdict(){
    //
    // }
    toPersonal(authorId){
      //TODO: 跳转到个人页面

    }
  }
}
</script>

<style scoped>
  .article-cover{

  }
.avatar{
  width: 30px;
  height: 100%;
  border-radius: 30px
}
</style>