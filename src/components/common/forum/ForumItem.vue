<template>
  <div class="item-main cursor">
    <Row>
      <Col span="6">
        <div class="span-text cursor" @click="goNewPage1('/user/')">{{ forumItem.nickName }}</div>
      </Col>
      <Col span="6">
        <div class="span-text" @click="lookDetail">{{forumItem.createTime}}</div>
      </Col>
      <Col span="6">
      </Col>
      <Col span="3">
        <!--        <span class="span-text">查看人数</span>-->
      </Col>
      <Col span="3">
        <div class="span-text">{{forumItem.commonCount}}</div>
      </Col>
    </Row>
    <div @click="lookDetail">
      <Row>
        <Col span="24">
          <div class="span-text title a-line">{{forumItem.postName}}</div>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div class="span-text text-description">{{forumItem.postDescription}}</div>
        </Col>
      </Row>
    </div>
    <div :id="'images' + idCount">
      <ul>
        <li class="li-inline zoom-in" v-for="(imgPath,index) of imageList">
          <img :src="imgPath" :alt="'描述辅助图片' + index" style="width: 100px; height: 100px">
        </li>
      </ul>
    </div>
    <div class="space10"></div>
    <div class="space10"></div>
    <div class="line"></div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';

  export default {
    name: "ForumItem",
    props: {
      idCount: String,
      forumItem: {
        postId: String,
        authorId: String,
        nickName: String,
        postName: String,
        postDescription: String,
        imagePath: String,
        createTime: String,
        viewsCount: String,   //暂时不用
        commonCount: String
      }
    },
    data() {
      return {
        imageList: [],
        viewer: undefined,
      }
    },
    created() {
      // 处理图片分裂问题
      if (this.forumItem.imagePath != null && this.forumItem.imagePath != '' && this.forumItem.imagePath != undefined) {
        this.imageList = this.forumItem.imagePath.split("-*-");
        for (let item of this.imageList) {
          // console.log(item);
          if (item == '' || item == undefined) {      // 删除空行
            this.imageList.splice(this.imageList.indexOf(item), 1);
          }
        }
      }
    },
    methods: {
      lookDetail() {
        const {href} = this.$router.resolve({
          path: '/forumDetail/' + this.forumItem.postId,
          query: {},
        });
        window.open(href, "_blank")
      },
      goNewPage1(path) {
        const {href} = this.$router.resolve({
          path: path + this.forumItem.authorId,
          query: {},
        });
        window.open(href, "_blank")
      },
    },
    mounted() {
      const ViewerDom = document.getElementById('images' + this.idCount);
      this.viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
        rotatable: false,
      });
    }
  }
</script>

<style scoped>
  .space10 {
    height: 10px;
  }

  .item-main {
    padding: 10px 5px 10px 5px;
  }

  .span-text {
    padding: 5px;
  }

  .cursor {
    cursor: pointer;
  }

  .zoom-in{
    cursor: zoom-in;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .line {
    height: 1px;
    border-bottom: 1px solid #ebebeb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
  }

  .a-line:hover {
    color: #000000;
    cursor: pointer;
  }

  .text-description {
    max-width: 724px;
    height: 50px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 正常换行显示 */
    -webkit-box-orient: vertical;
  }

  .li-inline {
    display: inline;
    list-style-type: none;
    padding: 5px 5px;
  }
</style>