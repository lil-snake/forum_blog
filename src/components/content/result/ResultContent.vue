<template>
  <div class=" result-content">
    <div class="search-info">
      您搜索的关键词：
      <Tag color="#ff5d74" v-for="(item,index) in tags" :key="index">{{ item }}</Tag>
    </div>

    <div class="space"></div>
<!--    <SearchItem v-for="(searchData,index) in searchDataList" :key="index" :search-data="searchData"></SearchItem>-->
    <div v-loading="loading">
      <div class="padding-30 rounded bordered">
        <div class="row">
          <LatestPostsItem v-for="(itemData,index) in searchDataList" :key="index"
                           :item="itemData"></LatestPostsItem>
        </div>
        <div class="span-text"  v-if="searchDataList != null && searchDataList.length == 0">
          什么都没有。。。
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="box-line"></div>
    <div class="space"></div>

  </div>
</template>

<script>
import SearchItem from "components/common/search/SearchItem";
import LatestPostsItem from "components/common/latestPosts/LatestPostsItem";

export default {
  name: "ResultContent",
  components: {
    SearchItem,
    LatestPostsItem,
  },
  props: {
    loading: Boolean,
    tags: Array,
    searchDataList: Array
  },
  data() {
    return {
      // searchData: {
      //   articleId: 'abs',
      //   title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
      //   avatarPath: '我是头像地址',
      //   nickName: '我是昵称我是昵称我是昵称我是昵称',
      //   briefIntroduction: '我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介',
      //   pageviews: '678',
      //   likes: '89',
      //   collection: '32',
      // },

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>
.result-content {
  min-height: 600px;
  /*background-color: #0dcaf0;*/
  width: 100%;
}

.search-info {
  width: 100%;
  /*height: 20px;*/
  border: 1px solid #ebebeb;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25)
}

.space{
  height: 10px;
}


</style>