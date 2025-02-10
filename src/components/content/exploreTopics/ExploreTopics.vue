<template>

  <div class="widget rounded">
    <div class="widget-header text-center">
      <h3 class="widget-title">Explore Topics</h3>
      <img src="~assets/img/wave.svg" class="wave" alt="wave"/>
    </div>
    <div class="widget-content">
      <ul class="list">
        <li v-for="(item,index) in labels" :key="index">
          <router-link :to="{path:'/searchResult/'+ item.labelName}" target="_blank">
            {{item.labelName}}
          </router-link>
          <span>{{item.times}}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import {getQuery} from 'network/labelRecord';

export default {
  name: "ExploreTopics",
  data() {
    return {
      labels: []
    }
  },
  created() {
    this.getLabel();
  },
  methods: {
    getLabel() {
      getQuery(0,10).then(res => {
        this.labels = res.data.data;
      })
    },
    toSearchPage(){
      // TODO：搜索，跳转页面
    }


  }
}
</script>

<style scoped>
.a-line:hover{
  color: #000000;;
}
</style>