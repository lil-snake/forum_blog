<template>
  <div class="">
    <TabBar :isAction="this.tpye"></TabBar>

    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8">

            <div v-loading="loading">
              <div class="padding-30 rounded bordered">
                <div class="row">
                  <LatestPostsItem v-for="(itemData,index) in articleList" :key="index" :item="itemData" ></LatestPostsItem>
                </div>
              </div>
            </div>
            <div class="space"></div>
            <div class="box-line"></div>
            <div class="space"></div>
            <div class="text-center">
              <Page :total="total" :page-size="6" @on-change="change" show-elevator />
            </div>

          </div>
          <div class="col-lg-4">
            <Blogger></Blogger>
            <PostTabs></PostTabs>
            <div class="space"></div>
            <Celebration></Celebration>

          </div>
        </div>
      </div>
    </section>
    <div class="space"></div>
    <Footer></Footer>
  </div>
</template>

<script>
  import TabBar from "components/common/tabBar/TabBar";
  import PostTabs from "components/content/featured/PostTabs";
  import Celebration from "components/content/celebration/Celebration";
  import Blogger from "components/common/blogger/Blogger";

  import LatestPostsItem from "components/common/latestPosts/LatestPostsItem";
  import {getList} from "network/article";
  import Footer from "components/content/footer/Footer";

  export default {
    name: "Article",
    components: {
      TabBar,
      PostTabs,
      Celebration,
      Blogger,
      LatestPostsItem,
      Footer,
    },
    data() {
      return {
        articleList: [],
        total: 100,
        loading: true,
        tpye: "1"
      }
    },
    created() {
      debugger
      this.tpye = this.$route.params.tpye;
      this.load(this.tpye,1);     
    },
    methods: {
      change(current){
        this.loading = true;
        this.load(this.tpye,current);
      },
      load(type,current){
        getList(type,current, 6).then(res => {
          this.articleList = res.data.data;
          this.total = res.data.total;
        }).finally(() => {
          this.loading = false;
        })
      }
    },
  }
</script>

<style scoped>
  .space{
    height: 30px;
  }
</style>