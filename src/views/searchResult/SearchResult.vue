<template>
  <div>
    <TabBar :isAction="2"></TabBar>
    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8">
            <ResultContent :loading="loading" :tags="tags" :searchDataList="searchDataList"></ResultContent>
            <div class="text-center">
<!--              <el-pagination-->
<!--                  :page-size="5"-->
<!--                  layout="prev, pager, next, jumper"-->
<!--                  :total="total">-->
<!--              </el-pagination>-->
              <Page :total="total" :page-size="5" @on-change="change" show-elevator/>
            </div>
          </div>
          <div class="col-lg-4">
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
  import ResultContent from "components/content/result/ResultContent";
  import {getSearchBlog} from "network/article";
  import Footer from "components/content/footer/Footer";

  export default {
    name: "SearchResult",
    components: {
      TabBar,
      PostTabs,
      Celebration,
      ResultContent,
      Footer
    },
    data() {
      return {
        keyword: '',
        tags: [],
        searchDataList: [],

        // 分页插件
        currentPage: 1,
        total: 100,
        loading: false,
      }
    },
    created() {
      this.loading = true;
      this.keyword = this.$route.params.keyWord;
      this.splitKeyWord();
      this.getSearch();
    },
    methods: {
      getSearch() {
        //发送网络请求
        getSearchBlog(this.keyword, this.currentPage, 5).then(res => {
          // console.log(res);
          this.searchDataList = res.data.data;
          this.total = res.data.total
        }).finally(()=>{
          this.loading = false;
        })
      },
      splitKeyWord() {
        //拆分keyword,后台也是按照这个格式，显示在前端做
        let keyWords = this.keyword.trim().split(/\s+/); // 按空格拆分
        this.tags.push(...keyWords);
      },

      change(current) {
        this.loading = true;
        getSearchBlog(this.keyword, current, 5).then(res => {
          // console.log(res);
          this.searchDataList = res.data.data;
          this.total = res.data.total
        }).finally(()=>{
          this.loading = false;
        })
      }

    }
  }
</script>

<style scoped>
  .location {
    display: block;
    float: right;
  }

  .space {
    height: 15px;
  }

  .el-pagination {
    text-align: center;
  }

  .span-text {
    color: #fe5070;
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
</style>