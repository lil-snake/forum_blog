<template>
  <div class="search-item">
    <div class="head">
      <router-link :to="{path:'/blog/'+searchData.articleId}" target="_blank">
        <h4 class="div-text" :title="searchData.title">{{ searchData.title }}</h4>
      </router-link>
    </div>
    <div class="hidden-id">{{searchData.articleId}}</div>
    <div class="hidden-id">{{searchData.authorId}}</div>
    <div class="body">
      <Row class-name="Row">
        <Col span="5" class="div-text nick-text" :title="searchData.nickName">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small"/>
          {{ searchData.nickName }}
        </Col>
        <Col span="13" class="div-text">
          {{ searchData.briefIntroduction }}
        </Col>
        <Col span="6">
          <Row>
            <Col span="8" class="div-text" :title="searchData.pageviews">
              <i class="el-icon-view">{{ searchData.pageviews }}</i>
            </Col>
            <Col span="8" class="div-text" :title="searchData.collection">
              <Icon type="md-star"/>
              {{ searchData.collection }}
            </Col>
            <Col span="8" class="div-text" :title="searchData.likes">
              <Icon type="ios-thumbs-up"/>
              {{ searchData.likes }}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    searchData: {
      articleId: '',
      authorId: '',
      title: '',
      avatarPath: '',
      nickName: '',
      briefIntroduction: '',
      pageviews: '',
      likes: '',
      collection: ''
    }
  },
  data() {
    return {
      // searchData: {
      //   title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
      //   avatarPath: '我是头像地址',
      //   nickName: '我是昵称我是昵称我是昵称我是昵称',
      //   briefIntroduction: '我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介',
      //   pageviews: '678',
      //   likes: '89',
      //   collection: '32',
      // }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>
.search-item {
  padding: 15px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
  margin-top: 12px
}

.head {

}

.div-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.briefIntroduction-width {
  width: 400px;
  max-width: 405px;
}

.body {
  width: 100%;
  height: 25px;
  line-height: 25px;
  /*background-color: #0dcaf0;*/
}

.nick-text{
  font-size: 16px;
}

.hidden-id{
  display: none;
}

.Row {
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
}
</style>