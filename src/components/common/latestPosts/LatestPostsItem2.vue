<template>
  <div class="col-md-12 col-sm-6">
    <!-- post -->
    <div class="post post-list clearfix">
      <div class="thumb rounded">
										<span class="post-format-sm">
											<i class="icon-picture"></i>
										</span>
        <a href="blog-single.html">
          <div class="inner">
            <img :src="item.coverPath" class="author" alt="cover" v-if="item.coverPath != null && item.coverPath != ''"/>
            <img src="http://image.fangweb.top/featured-lg.jpg" class="author" alt="cover" v-else/>
          </div>
        </a>
      </div>
      <div class="details">
        <ul class="meta list-inline mb-3">
          <li class="list-inline-item">
            <a href="#"><img :src="item.avatarPath" class="author avatar" alt="author"/>{{ item.nickName }}</a>
          </li>
          <li class="list-inline-item">{{ item.createTime }}</li>
        </ul>
        <h5 class="post-title div-text-box1"><a><router-link target="_blank" :to="{path:'/blog/' + item.articleId}">{{ item.title }}</router-link></a></h5>
        <p class="excerpt mb-0 div-text-box2" :title="item.briefIntroduction">{{ item.briefIntroduction }}</p>
        <div class="post-bottom clearfix d-flex align-items-center">
          <div class="social-share me-auto">
            <el-button type="primary" icon="el-icon-edit" circle @click="modArticle(item.articleId)"></el-button>
            <!--            <ul class="icons list-unstyled list-inline mb-0">-->
            <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f"></i></a></li>-->
            <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>-->
            <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-linkedin-in"></i></a></li>-->
            <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-pinterest"></i></a></li>-->
            <!--              <li class="list-inline-item"><a href="#"><i class="fab fa-telegram-plane"></i></a></li>-->
            <!--              <li class="list-inline-item"><a href="#"><i class="far fa-envelope"></i></a></li>-->
            <!--            </ul>-->
          </div>
          <div class="more-button float-end">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(item.articleId)"></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteDetail} from "network/article";

export default {
  name: "LatestPostsItem2",
  props: {
    item: {
      coverPath: String,
      avatarPath: String,
      authorName: String,
      createTime: String,
      title: String,
      briefIntroduction: String
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    viewArticle(articleId) {
      // console.log(articleId);
      //  跳到详情页
      // this.$router.push('/blog/' + this.postItem.articleId);
    },
    share() {
      this.$notify.info({
        title: '提示消息',
        message: '该功能还没上线哦~'
      });
    },
    modArticle(code){
      this.$router.push("/blogEdit/"+code);
    },
    deleteArticle(articleId){
      deleteDetail(articleId).then(res => {
        // console.log(res);
        if(res.status=='2000'){
          this.$notify({
                message: '文章删除成功',
                type: 'success'
              });
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
.p-text {
  height: 48px;
  width: 379px;
  overflow: hidden;
  white-space: normal; /* 正常换行显示 */
  text-overflow: ellipsis;
}

.div-text-box1{
  height: 56px;
  width: 100%;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.div-text-box2 {
  height: 45px;
  width: 100%;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
  .avatar{
    width: 30px;
    border-radius: 30px;
  }
</style>