<template>

	<div class="post-tab">
		<!-- post tabs -->
		<div class="post-tabs rounded bordered">
			<!-- tab navs -->
			<ul class="nav nav-tabs nav-pills nav-fill" id="postsTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button aria-controls="popular" aria-selected="true" class="nav-link" :class="{active:isActive=='popular'}"
									data-bs-target="#popular"
									data-bs-toggle="tab" id="popular-tab" role="tab" type="button" @click="tabNavsClick('popular')">
						热门文章
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button aria-controls="recent" aria-selected="false" class="nav-link" :class="{active:isActive=='recent'}"
									data-bs-target="#recent"
									data-bs-toggle="tab" id="recent-tab" role="tab" type="button" @click="tabNavsClick('recent')">猜你喜欢
					</button>
				</li>
			</ul>
			<!-- tab contents -->
			<div class="tab-content" id="postsTabContent">
				<!-- loader -->
				<div class="lds-dual-ring"></div>
				<!-- popular posts -->
				<div aria-labelledby="popular-tab" class="tab-pane fade show" id="popular" role="tabpanel" :class="{active:isActive=='popular'}">
					<!-- post Popular 已做封装-->
					<PostItem v-for="(item,index) in popularData" :key="index" :itemData="item" />
				</div>
				<!-- recent posts -->
        <div aria-labelledby="recent-tab" class="tab-pane fade show" id="recent" role="tabpanel" :class="{active:isActive=='recent'}">
          <!-- post Recent 已做封装 -->
          <PostItem v-for="(item,index) in recentData" :key="index" :itemData="item"/>
        </div>
			</div>
		</div>
	</div>

</template>

<script>
  import PostItem from "components/common/post/PostItem";

  import {getPopular} from "network/article";
  import {getRecent} from "../../../network/article";

  export default {
    name: "PostTabs",
    components: {
      PostItem
    },
    data() {
      return {
        format: "smallPicture",
        isActive: "popular",
        popularData: [],
        recentData: []
      }
    },
    created() {
      this.sendPopular();
      this.sendRecent();
    },
    methods: {
      tabNavsClick(select) {
        this.isActive = select;
        // console.log(this.isActive);
      },
      sendPopular(){
        getPopular(5).then(res => {
          this.popularData = res.data;
          this.popularData.shift(); // 把数组的第一个元素从其中删除，并返回第一个元素的值
          // console.log(this.popularData)
        })
      },
      sendRecent(){
        getRecent().then(res => {
          this.recentData  = res.data;
          // console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
.post-tab{
  width: 100%;
}
</style>