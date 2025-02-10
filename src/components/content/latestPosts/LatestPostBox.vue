<template>
	<div class="padding-30 rounded bordered">
		<div class="row">
			<LatestPostsItem v-for="(item,index) in dataList " :key="index" :item=item></LatestPostsItem>
		</div>
		<!-- load more button -->
		<div class="text-center">
			<button class="btn btn-simple" @click="loadMore()">更 多</button>
		</div>
	</div>
</template>

<script>
	import LatestPostsItem from "components/common/latestPosts/LatestPostsItem";
  import {getLatestPosts} from "network/article";

  export default {
    name: "LatestPostBox",
		components: {
      LatestPostsItem
		},
    data() {
      return {
        dataList: [],
        curPage: 1,
        size: 4,
        total: 0
      }
    },
    created() {
      this.sendRequest();
    },
    methods: {
      sendRequest(){
        getLatestPosts(this.curPage,this.size).then(res => {
          // console.log(res);
          this.dataList = res.data.data;
          this.total = res.data.total;
        })
      },
      loadMore(){
        if (this.curPage * this.size >= this.total){
          this.$notify({
            title: '消息提醒',
            message: '没有更多的数据了',
            type: 'success'
          });
          return;
        }
        this.curPage++;
        getLatestPosts(this.curPage,this.size).then(res => {
          // console.log(res);
          this.dataList.push(...res.data.data);
					this.total = res.data.total;
        })

      }
    }
  }
</script>

<style scoped>

</style>