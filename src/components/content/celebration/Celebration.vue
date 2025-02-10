<template>
  <div class="widget rounded" v-loading="loading">
    <div class="widget-header text-center">
      <h3 class="widget-title">好书推荐</h3>
      <img src="~assets/img/wave.svg" class="wave" alt="wave"/>
    </div>
    <div class="widget-content">
      <div class="post-carousel-widget">
        <!-- post -->
        <CelebrationItem v-for="(item,index) in dataList" :key="index" :celebration="item">
        </CelebrationItem>
      </div>
      <!-- carousel arrows -->
      <div class="slick-arrows-bot">
        <button type="button" data-role="none" class="carousel-botNav-prev slick-custom-buttons" aria-label="Previous"
                @click="turnPage(-1)"><i class="icon-arrow-left"></i></button>
        <button type="button" data-role="none" class="carousel-botNav-next slick-custom-buttons" aria-label="Next"
                @click="turnPage(1)"><i class="icon-arrow-right"></i></button>
      </div>
    </div>
  </div>

</template>

<script>
import CelebrationItem from "components/common/celebration/CelebrationItem";
import {getMostCollection} from "network/article";

export default {
  name: "Celebration",
  components: {
    CelebrationItem
  },
  data() {
    return {
      loading: false,
      dataList: [],
      curPage: 1,
      size: 2,
      total: 0
    }
  },
  created() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      getMostCollection(this.curPage, this.size).then(res => {
        // console.log(res.data);
        this.dataList = res.data.data;
        this.total = res.data.total;
      })
    },
    turnPage(curPage) {
      this.loading = true;
      this.curPage += curPage;
      // console.log(this.curPage);
      if (this.curPage <= 0) {
        this.curPage = 1;
        this.loading = false;
        return;
      }
      if ((this.curPage + 1) * this.size > this.total) {
        this.curPage = 1;
      }
      getMostCollection(this.curPage, this.size).then(res => {
        // console.log(res.data);
        this.dataList = res.data.data;
        this.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      })

    }
  }
}
</script>

<style scoped>

</style>