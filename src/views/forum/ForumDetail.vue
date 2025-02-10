<template>
  <div>
    <TabBar :isAction="3"></TabBar>
    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8" ref="left">
            <div class="col-md-12 col-sm-6">
              <div class="details-main" v-loading="postInfoLoading">
                <Row>
                  <Col span="12">
                    <div class="div-text">
                      <a>
                        <router-link target="_blank" :to="{path:'/blog/'}"><img :src="postInfo.avatarPath"
                                                                                class="author avatar" alt="用户头像"/>
                          {{postInfo.nickName}}
                        </router-link>
                      </a>
                    </div>
                  </Col>
                  <Col span="12">
                    <div class="div-text"> {{postInfo.createTime}}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <div class="div-text wrap">
                      <h4>{{postInfo.postName}}</h4>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <div class="div-text wrap size20">
                      {{postInfo.postDescription}}
                    </div>
                  </Col>
                </Row>
                <div id="details-img">
                  <ul>
                    <li class="li-inline zoom-in" v-for="(imgPath,index) of imageList">
                      <img :src="imgPath" :alt="'描述辅助图片' + index" style="width: 100px; height: 100px">
                    </li>
                  </ul>
                </div>
                <div class="space"></div>
                <div class="div-text">
                  <!--评论区-->
                  <div class="">
                    <Row>
                      <Col flex="45px">
                        <div class="div-text height50 pad-top">
                          <img :src="commentAvatar" class="author avatar" alt="未登录"/>
                        </div>
                      </Col>
                      <Col flex="auto">
                        <div class="div-text height50">
                          <Input v-model="commentInput" size="large" placeholder="请明智发表评论..." @on-enter="sendComment"/>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div class="space10"></div>
              <div class="details-main" v-loading="commentLoading">
                <div class="no-comment" v-if="total == 0">暂无评论，快来发表你的意见互相交流.</div>
                <div v-else>
                  <ForumCommentItem v-for="(item, index) of commentList" @deleteComment="handleDelete" :key="index"
                                    :itemData="item" :floor="floor + index + ''"/>
                  <div class="space10"></div>
                  <div class="text-center">
                    <Page :total="total" :page-size="10" @on-change="change" show-elevator/>
                  </div>
                  <div class="space10"></div>
                </div>
              </div>
            </div>
            <div class="space"></div>
            <Footer></Footer>
          </div>
          <div class="col-lg-4">
            <div :class="{side:isSide}">
              <Blogger></Blogger>
              <PostTabs></PostTabs>
              <div class="space"></div>
              <Celebration></Celebration>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';

  import TabBar from "components/common/tabBar/TabBar";
  import PostTabs from "components/content/featured/PostTabs";
  import Celebration from "components/content/celebration/Celebration";
  import Blogger from "components/common/blogger/Blogger";
  import Footer from "components/content/footer/Footer";
  import {getPostInfo} from "network/postInfo";
  import {getCookie, getCookieAuthorId, getCookieAvatarPath} from "common/cookieUtils";
  import ForumCommentItem from "components/common/forum/ForumCommentItem";
  import {releasePrtComment, getPrtComment} from "network/portComment";

  export default {
    name: "ForumDetail",
    components: {
      TabBar,
      ForumCommentItem,
      PostTabs,
      Celebration,
      Blogger,
      Footer
    },
    data() {
      return {
        postId: '',
        imageList: [],
        commentInput: '',
        isSide: true,
        postInfo: Object,
        postInfoLoading: true,

        commentAvatar: '',
        total: 100,
        commentLoading: true,
        commentList: [],
        floor: 1,

      }
    },
    created() {
      this.postId = this.$route.params.postId;
      this.commentAvatar = getCookieAvatarPath();
      this.sendToGetPostInfo();
      this.sendToGetPostComment(this.postId, 1, 10);
    },
    methods: {
      sendToGetPostInfo() {
        getPostInfo(this.postId).then(res => {
          this.postInfo = res.data;
          if (this.postInfo.imagePath != undefined || this.postInfo.imagePath != '') {
            this.imageList = this.postInfo.imagePath.split('-*-');
            for (let item of this.imageList) {
              if (item == '' || item == undefined) {      // 删除空行
                this.imageList.splice(this.imageList.indexOf(item), 1);
              }
            }
          }
        }).finally(() => {
          this.postInfoLoading = false;
        })
      },
      sendToGetPostComment(portId, curPage, size) {
        getPrtComment(portId, curPage, size).then(res => {
          this.commentList = res.data.data;
          this.total = res.data.total;
        }).finally(() => {
          this.commentLoading = false;
        })
      },
      sendComment() {
        // 发表评论
        const token = getCookie();
        if (token == undefined || token == '') {
          this.$Notice.warning({
            title: '请先登录'
          })
          return;
        }
        let portComment = {
          "commentContent": "",
          "portId": "",
        }
        portComment.commentContent = this.commentInput;
        portComment.portId = this.postId;
        releasePrtComment(portComment).then(res => {
          if (res.status == 2000) {
            this.$notify({
              message: res.msg,
              type: 'success'
            });
            this.commentInput = '';
          } else {
            this.$notify({
              message: res.msg,
              type: 'warning'
            });
          }
        })

      },
      change(curPage) {
        this.sendToGetPostComment(this.postId, curPage, 10);
        this.floor = (curPage - 1) * 10;
      },
      handleDelete(itemData) {
        this.commentList.splice(this.commentList.indexOf(itemData), 1);
      }

    },
    mounted() {
      const ViewerDom = document.getElementById('details-img');
      this.viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
        rotatable: false,
      });
    }
  }
</script>

<style scoped>
  .space {
    height: 30px;
  }

  .space10 {
    height: 10px;
  }

  .details-main {
    padding: 5px;
    min-height: 100px;
    height: 100%;
    border: 1px solid #ebebeb;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .side {
    height: 100vh;
    overflow: auto;
  }

  .side::-webkit-scrollbar {
    /*滚动条整体部分，可以设置宽度啥的*/
    width: 4px;
  }

  .side::-webkit-scrollbar-track {
    /*外层轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(76, 67, 68, 0.2);*/
    /*border-radius: 0;*/
    /*background: rgba(20, 20, 20, 0.2);*/
  }

  .side::-webkit-scrollbar-thumb {
    /*滚动的滑块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(26, 26, 26, 0.3);
  }

  .div-text {
    padding: 5px;
  }

  .wrap {
    word-break: break-all;
    word-wrap: break-spaces;
  }

  .size20 {
    font-size: 20px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px
  }

  .li-inline {
    display: inline;
    list-style-type: none;
    padding: 5px 5px;
  }

  .zoom-in {
    cursor: zoom-in;
  }

  a {
    color: #515a6e;
  }

  a:hover {
    color: #fe6877;
  }

  .height50 {
    height: 50px;
  }

  .pad-top {
    padding-top: 10px;
  }

  .no-comment {
    min-height: 60px;
    text-align: center;
    line-height: 60px;
  }
</style>