<template>
  <div id="blog">
    <TabBar></TabBar>

    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8">
            <BlogDetail @returnData="returnAuthorId"></BlogDetail>
          </div>
          <div class="col-lg-4">
            <Blogger :authorId="authorId" v-if="loading"></Blogger>
            <PostTabs></PostTabs>
            <div class="space"></div>
            <Celebration></Celebration>

          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>

  </div>
</template>

<script>
import BlogDetail from "components/content/blog/BlogDetail";
import TabBar from "components/common/tabBar/TabBar";
import PostTabs from "components/content/featured/PostTabs";
import Celebration from "components/content/celebration/Celebration";
import Footer from "components/content/footer/Footer";
import Blogger from "components/common/blogger/Blogger";

export default {
  name: "Blog",
  components: {
    TabBar,
    BlogDetail,
    PostTabs,
    Celebration,
    Footer,
    Blogger,
  },
  data() {
    return {
      articleId: '',
      authorId: '',
      loading: false
    }
  },
  created() {
    this.articleId = this.$route.params.articleId;
  },
  methods: {
    returnAuthorId(authorId){
      this.authorId = authorId;
      this.loading = true;
    }
  }
}
</script>

<style scoped>
.space{
  height: 15px;
}
</style>