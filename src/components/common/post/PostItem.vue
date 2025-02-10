<template>

  <div v-if="active !== 'smallPicture'" class="post post-list-sm square">
    <div class="thumb rounded">
      <a :href="itemData.hrefLink">
        <div class="inner">
          <img :src="itemData.coverPath" v-if="itemData.coverPath != null && itemData.coverPath != ''" alt="post-title"/>
          <img src="http://image.fangweb.top/featured-lg.jpg" v-else alt="post-title"/>
        </div>
      </a>
    </div>
    <div class="details clearfix">
      <h6 class="post-title my-0"><a href="blog-single.html">{{ itemData.introduction }}</a></h6>
      <ul class="meta list-inline mt-1 mb-0">
        <li class="list-inline-item">{{ itemData.modifiedTime }}</li>
      </ul>
    </div>
  </div>
  <div v-else class="post post-list-sm circle">
    <div class="thumb rounded">
      <a :href="itemData.hrefLink">
        <div class="inner">
          <img :src="itemData.coverPath" v-if="itemData.coverPath != null && itemData.coverPath != ''" alt="post-title"/>
          <img src="http://image.fangweb.top/featured-lg.jpg" v-else alt="post-title"/>
        </div>
      </a>
    </div>
    <div class="details clearfix">
      <h6 class="post-title my-0">
        <div class="details-title div-text-box" @click="toDetail" :title="itemData.title">{{ itemData.title }}</div>
      </h6>
      <ul class="meta list-inline mt-1 mb-0">
        <li class="list-inline-item">{{ itemData.modifiedTime }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "PostItem",
  props: {
    active: {
      type: String,
      default: "smallPicture"
    },
    itemData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // hrefLink: "",
      // imgLink: "~/assets/img/posts/tabs-1.jpg",
      // title: "",
      // time: ""
    }
  },
  created() {
    // console.log(this.itemData);

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // console.log(this.itemData);
    },
    toDetail() {
      // this.$router.push('/blog/' + this.itemData.articleId);
      const {href} = this.$router.resolve({
        path: "/blog/" + this.itemData.articleId,
        query: {},
      });
      window.open(href, "_blank")
    }
  }
}
</script>

<style scoped>
.details-title {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
}
.details-title:hover {
  color: #000000;
}
.div-text-box{
  height: 45px;
  width: 100%;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>