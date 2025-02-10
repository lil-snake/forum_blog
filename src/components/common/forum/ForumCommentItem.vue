<template>
  <div class="comment-list">
    <Row>
      <Col span="8">
        <div>
          <a class="cursor a-line">
            <router-link target="_blank" :to="{path:'/blog/' + itemData.authorId}">
              <img :src="itemData.avatarPath" class="author avatar" alt="用户头像"/> {{itemData.nickName}}
            </router-link>
          </a>
        </div>
      </Col>
      <Col span="4">
        <div class="center">{{itemData.createTime}}</div>
      </Col>
      <Col span="4">
        <div class="center">第 {{floor}} 楼</div>
      </Col>
      <Col span="4">
        <div class="delete center" v-show="authorId === itemData.authorId" @click="deleteComment"><i
            class="el-icon-delete">删除评论</i></div>
      </Col>
      <Col span="4">
        <div class="delete center" @click="reportComment"><i class="el-icon-warning">违规举报</i></div>
      </Col>
    </Row>
    <div class="space10"></div>
    <Row>
      <Col span="24">
        <div class="wrap size16">{{ itemData.commentContent }}</div>
      </Col>
    </Row>
    <div class="space10"></div>
    <hr/>
  </div>
</template>

<script>
  import {getCookieAuthorId} from "common/cookieUtils";
  import {deletePrtComment, reportPrtComment} from "network/portComment";

  export default {
    name: "ForumCommentItem",
    props: {
      itemData: Object,
      floor: String,
    },
    data() {
      return {
        authorId: '',
      }
    },
    created() {
      this.authorId = getCookieAuthorId();
    },
    methods: {
      deleteComment() {
        deletePrtComment(this.itemData.id).then(res => {
          this.$notify({
            message: res.msg,
            type: "success"
          })
          this.$emit("deleteComment", this.itemData);
        })
      },
      reportComment() {
        reportPrtComment(this.itemData.id).then(res => {
          this.$notify({
            message: res.msg,
            type: "success"
          })
          this.$emit("deleteComment", this.itemData);
        })
      }
    }
  }
</script>

<style scoped>
  .comment-list {
    padding: 5px;
  }

  .a-line {
    color: black;
  }

  .cursor {
    cursor: pointer;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px
  }

  .space10 {
    height: 10px;
  }

  .wrap {
    word-break: break-all;
    word-wrap: break-spaces;
  }

  .size16 {
    font-size: 16px;
  }

  .delete {
    color: white;
    cursor: pointer;
  }

  .delete:hover {
    color: rgba(0, 0, 0, 0.6);
  }

  .center {
    text-align: center;
  }
</style>