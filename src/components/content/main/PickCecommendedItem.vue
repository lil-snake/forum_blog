<template>
  <!-- post -->
  <div class="post post-list-sm square">
    <div class="thumb rounded">
      <a href="blog-single.html">
        <div class="inner">
          <img :src="item.coverPath" class="author" alt="cover" v-if="item.coverPath != null && item.coverPath != ''"/>
          <img src="http://image.fangweb.top/" class="author" alt="cover" v-else/>
        </div>
      </a>
    </div>
    <div class="details clearfix">
      <h6 class="post-title my-0">
        <a href="#">
          <router-link target="_blank" :to="{path:'/blog/' + item.articleId}"><div class="title" :title="item.title">{{ item.title }}</div></router-link>
        </a>
      </h6>
      <ul class="meta list-inline mt-1 mb-0">
        <li class="list-inline-item">{{ item.modifiedTime }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PickCecommendedItem",
    props: {
      item: {
        // title: '',
        // coverPath: '',
        // modifiedTime: '',
      }
    },
    created() {

    },
    methods: {}
  }
</script>

<style scoped>
  .title {
    max-height: 42px;
    max-width: 195px;
    overflow: hidden;
    white-space: normal; /* 正常换行显示 */
    text-overflow: ellipsis;
  }
</style>