<template>
  <div v-loading="loading">
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="avatarPath"></el-avatar>
      <div class="reply-info">
        <div
            tabindex="0"
            contenteditable="true"
            id="replyInput"
            spellcheck="false"
            placeholder="评论不欢迎灌水，请友善发表评论..."
            class="reply-input"
            @focus="showReplyBtn"
            @input="onDivInput($event)"
        ></div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button
            class="reply-btn"
            size="medium"
            @click="sendComment"
            type="primary">
          发表评论
        </el-button>
      </div>
    </div>
    <div
        v-for="(item, i) in comments"
        :key="i"
        class="author-title reply-father"
    >
      <el-avatar class="header-img" :size="40" :src="item.avatarPath"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ item.nickName }}</span>
        <span class="author-time">{{ item.time }}</span>
      </div>
      <div class="icon-btn">
        <!-- 评论回复按钮以及条数 -->
        <span @click="showReplyInput(i, '0',item.nickName, item.id, item.authorId)">
          <i class="iconfont el-icon-s-comment"></i>
        </span>
        <span v-if="item.authorId === authorId" @click="deleteComment(i, '0',item.nickName, item.id)">
          <i class="el-icon-delete-solid"></i>
        </span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.comment }}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply, j) in item.replyList" :key="j" class="author-title">
          <el-avatar
              class="header-img"
              :size="40"
              :src="reply.avatarPath"></el-avatar>
          <div class="author-info">
            <span class="author-name">{{ reply.nickName }}</span>
            <span class="author-time">{{ reply.time }}</span>
          </div>
          <div class="icon-btn">
            <!-- 评论回复按钮以及条数 -->
            <span @click="showReplyInput(i,j, reply.nickName, reply.id, reply.authorId)">
              <i class="iconfont el-icon-s-comment"></i>
              <!--              {{ reply.commentNum }}-->
            </span>
            <span v-if="reply.authorId === authorId" @click="deleteComment(i, '0',reply.nickName, reply.id)">
              <i class="el-icon-delete-solid"></i>
            </span>
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{ reply.beenCommentedNickName }}:</span><!-- 被评论人nickName -->
              <span class="reply">{{ reply.comment }}</span>
            </p>
          </div>
          <div class="reply-box"></div>
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="avatarPath"></el-avatar>
        <div class="reply-info">
          <div
              tabindex="0"
              contenteditable="true"
              spellcheck="false"
              placeholder="输入评论..."
              @input="onDivInput($event)"
              class="reply-input reply-comment-input"
          ></div>
        </div>
        <div class="reply-btn-box">
          <el-button
              class="reply-btn"
              size="medium"
              @click="sendCommentReply(i)"
              type="primary"
          >
            发表回复
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {showComment,publishComment,deleteComment} from 'network/articleComment';
  import {getCookieAuthorId,getCookieAvatarPath,getCookieNickName} from "common/cookieUtils";

  const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e)
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.vueClickOutside = documentHandler
      document.addEventListener('click', documentHandler)
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.vueClickOutside)
      delete el.vueClickOutside
    },
  }
  export default {
    name: "Comment",
    props: {
      articleId: String,

      type: {
        type: Number,
        default: 0, //类型
      },
      authorInfo: {
        avatarPath: '',


      }
    },
    data: function () {
      return {
        loading: false,
        btnShow: false,
        index: '0',
        replyComment: '',
        subIndex: '0',
        authorId: '',
        nickName: '',
        avatarPath: '',
        // myName: 'Lana Del Rey',
        // myId: 19870621,
        // beenCommentedNickName: '',// 被评论人nickName
        beenCommentedId: -1,
        beenCommentedAuthorId: '',
        comments: [
          // {
          //   id: "e557405e700b4efbf0e591c137e3aaa7",
          //   articleId: "42256fe71711d2aeb84b18bf4e00f4fb",
          //   authorId: "598108905656729600",
          //   nickName: "bernie_fang",
          //   avatarPath: "https://avatars.githubusercontent.com/u/64625346?s=40&v=4",
          //   imagePath: "",
          //   comment: "这是第一条评论",
          //   commentContentHtml: "",
          //   beenCommentedId: "-1",
          //   time: "2022-01-26 20:54:23",
          //   firstComment: "-1",
          //   beenCommentedAuthorId: null,
          //   beenCommentedNickName: null,
          //   beenCommentedAvatarPath: null,
          //   inputShow: false,
          //   replyList: [
          //     {
          //       id: "78bd1b765710a10150c316e3e5e4c5a4",
          //       articleId: "42256fe71711d2aeb84b18bf4e00f4fb",
          //       authorId: "639798763756183552",
          //       nickName: "user001",
          //       avatarPath: "https://avatars.githubusercontent.com/u/22723262?s=48&v=4",
          //       imagePath: "",
          //       comment: "这是第一条回复评论",
          //       commentContentHtml: "",
          //       beenCommentedId: "e557405e700b4efbf0e591c137e3aaa7",
          //       time: "2022-01-26 20:56:51",
          //       firstComment: "e557405e700b4efbf0e591c137e3aaa7",
          //       beenCommentedAuthorId: "598108905656729600",
          //       beenCommentedNickName: "bernie_fang",
          //       beenCommentedAvatarPath: "https://avatars.githubusercontent.com/u/64625346?s=40&v=4",
          //       inputShow: false,
          //       replyList: null
          //     }
          //   ]
          // },
          // {
          //   "id": "e7e4396b05cec43577e3b40e0e9c3627",
          //   articleId: "42256fe71711d2aeb84b18bf4e00f4fb",
          //   authorId: "598108905656729600",
          //   nickName: "bernie_fang",
          //   avatarPath: "https://avatars.githubusercontent.com/u/64625346?s=40&v=4",
          //   imagePath: "",
          //   comment: "这是第二条评论",
          //   commentContentHtml: "",
          //   beenCommentedId: "-1",
          //   time: "2022-01-26 22:06:31",
          //   firstComment: "-1",
          //   beenCommentedAuthorId: null,
          //   beenCommentedNickName: null,
          //   beenCommentedAvatarPath: null,
          //   inputShow: false,
          //   replyList: [
          //     {
          //       id: "da9485faa51c87a60b5120be0272b5a1",
          //       articleId: "42256fe71711d2aeb84b18bf4e00f4fb",
          //       authorId: "639798763756183552",
          //       nickName: "user001",
          //       avatarPath: "https://avatars.githubusercontent.com/u/22723262?s=48&v=4",
          //       imagePath: "",
          //       comment: "这是第二条回复评论",
          //       commentContentHtml: "",
          //       beenCommentedId: "e7e4396b05cec43577e3b40e0e9c3627",
          //       time: "2022-01-26 22:08:06",
          //       firstComment: "e7e4396b05cec43577e3b40e0e9c3627",
          //       beenCommentedAuthorId: "598108905656729600",
          //       beenCommentedNickName: "bernie_fang",
          //       beenCommentedAvatarPath: "https://avatars.githubusercontent.com/u/64625346?s=40&v=4",
          //       inputShow: false,
          //       replyList: null
          //     },
          //     {
          //       id: "0c96c5ebd4f676c878f7a47e435a7286",
          //       articleId: "42256fe71711d2aeb84b18bf4e00f4fb",
          //       authorId: "598108905656729600",
          //       nickName: "bernie_fang",
          //       avatarPath: "https://avatars.githubusercontent.com/u/64625346?s=40&v=4",
          //       imagePath: "",
          //       comment: "第三条条回复第二条",
          //       commentContentHtml: "",
          //       beenCommentedId: "da9485faa51c87a60b5120be0272b5a1",
          //       time: "2022-01-26 22:09:17",
          //       firstComment: "e7e4396b05cec43577e3b40e0e9c3627",
          //       beenCommentedAuthorId: "639798763756183552",
          //       beenCommentedNickName: "user001",
          //       beenCommentedAvatarPath: "https://profile.csdnimg.cn/7/0/9/2_bernie_7",
          //       inputShow: false,
          //       replyList: null
          //     }
          //   ]
          // }
        ],
      }
    },
    directives: { clickoutside },
    created() {
      // console.log(this.$store.state.authorInfo);
      this.initInfo();
      this.getArticleComment();
    },
    methods: {
      // 获取评论
      getArticleComment(){
        this.loading = true;
        showComment(this.articleId).then(res => {
          if (res.status != 2000){
            this.$notify.error({
              title: '评论加载失败',
              message: res.msg,
            });
            return;
          }
          this.comments = res.data;
        }).finally(() => {
          this.loading = false;
        })
      },
      initInfo(){
        this.authorId = getCookieAuthorId();
        this.nickName = getCookieNickName();
        this.avatarPath = getCookieAvatarPath();
      },
      inputFocus() {
        var replyInput = document.getElementById('replyInput')
        replyInput.style.padding = '8px 8px'
        replyInput.style.border = '2px solid blue'
        replyInput.focus()
      },
      showReplyBtn() {
        this.btnShow = true
      },
      hideReplyBtn() {
        this.btnShow = false
        replyInput.style.padding = '10px'
        replyInput.style.border = 'none'
      },
      showReplyInput(i,j,name,id,authorId) {
        this.comments[this.index].inputShow = false
        this.index = i
        this.comments[i].inputShow = true
        this.beenCommentedNickName = name;//// 被评论人nickName
        this.beenCommentedId = id
        this.beenCommentedAuthorId = authorId;
        this.subIndex = j == '0' ? '0':j
      },
      addlikeNumber(i,id) {
        let list = this.comments[i].likeListId
        // console.log(i, name, id)
        if(list.length === 0){
          //在已经点赞的列表中未找到userId
          this.comments[i].isLike = true
          this.comments[i].like += 1
          this.comments[i].likeListId.push(id)
          console.log("点赞+1",this.comments[i].isLike,this.comments[i].like,this.comments[i].likeListId)
        }
        else{
          const index = list.indexOf(this.myId)
          this.comments[i].isLike = false
          this.comments[i].like -= 1
          this.comments[i].likeListId.splice(index,1)
          console.log("点赞-1",this.comments[i].isLike,this.comments[i].likeListId)
        }

      },
      countlikeNumber(type,i,j,id) {
        const text =  type === '1' ? this.comments[i] : this.comments[i].reply[j]
        let list = text.likeListId
        if(list.length === 0){
          //在已经点赞的列表中未找到userId
          text.isLike = true
          text.like += 1
          text.likeListId.push(id)
          console.log("点赞+1",text.isLike,text.like,text.likeListId)
        }
        else{
          const index = list.indexOf(this.myId)
          text.isLike = false
          text.like -= 1
          text.likeListId.splice(index,1)
          console.log("点赞-1",text.isLike,text.likeListId)
        }

      },
      _inputShow(i) {
        return this.comments[i].inputShow
      },
      sendComment() {
        if (this.authorId == '' || this.nickName == '' || this.avatarPath == '') {
          this.$notify({
            title: '警告',
            message: '请先登录',
            type: 'warning'
          });
          return;
        }
        if (!this.replyComment) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '评论不能为空',
          })
        } else {
          let a = {}
          let input = document.getElementById('replyInput')
          let timeNow = new Date().getTime()
          let time = this.dateStr(timeNow)
          a.articleId = this.articleId;
          a.authorId = this.authorId;
          a.comment = this.replyComment;
          a.firstComment = -1;
          a.beenCommentedId = -1;
          a.avatarPath = this.avatarPath;
          a.nickName = this.nickName;
          publishComment(a).then(res => {
            if (res.status !== 2000){
              this.$notify.error({
                title: '错误',
                message: res.msg
              });
              return;
            }
            this.$notify({
              message: '评论成功',
              type: 'success'
            });
          })
          a.time = time;
          this.comments.push(a);
          this.replyComment = ''
          input.innerHTML = ''
        }
      },
      sendCommentReply(i) {
        if (!this.replyComment) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '回复不能为空',
          })
        } else {
          let a = {}
          let timeNow = new Date().getTime()
          let time = this.dateStr(timeNow)
          // a.nickName = this.myName
          a.beenCommentedNickName = this.beenCommentedNickName  // 被评论人nickName
          // a.avatarPath = this.avatarPath
          a.comment = this.replyComment
          a.articleId = this.articleId;
          a.authorId = this.authorId;
          a.beenCommentedId = this.beenCommentedId;
          a.beenCommentedAuthorId = this.beenCommentedAuthorId;
          a.avatarPath = this.avatarPath;
          a.nickName = this.nickName;
          publishComment(a).then(res => {
            if (res.status !== 2000){
              this.$notify.error({
                title: '错误',
                message: res.msg
              });
              return;
            }
            this.$notify({
              message: '评论成功',
              type: 'success'
            });
          })
          a.time = time
          console.log(" this.comments[i].reply+++++++++++", this.comments[i].replyList,this.subIndex);
          this.comments[i].replyList.push(a)
          this.replyComment = ''
          document.getElementsByClassName('reply-comment-input')[i].innerHTML = ''
        }
      },
      onDivInput: function (e) {
        this.replyComment = e.target.innerHTML
      },
      dateStr(date) {
        //获取js 时间戳
        var time = new Date().getTime()
        //去掉 js 时间戳后三位，与php 时间戳保持一致
        time = parseInt((time - date) / 1000)
        //存储转换值
        var s
        if (time < 60 * 10) {
          //十分钟内
          return '刚刚'
        } else if (time < 60 * 60 && time >= 60 * 10) {
          //超过十分钟少于1小时
          s = Math.floor(time / 60)
          return s + '分钟前'
        } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
          //超过1小时少于24小时
          s = Math.floor(time / 60 / 60)
          return s + '小时前'
        } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
          //超过1天少于30天内
          s = Math.floor(time / 60 / 60 / 24)
          return s + '天前'
        } else {
          //超过30天ddd
          var date = new Date(parseInt(date))
          return (
            date.getFullYear() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getDate()
          )
        }
      },
      // 删除评论
      deleteComment(i,j,name,id){
        deleteComment(id).then(res => {
          this.$notify({
            message: res.msg,
            type: 'success'
          });
        })
        this.getArticleComment();
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .my-reply
    padding 10px
    background-color #fafbfc

    .header-img
      display inline-block
      vertical-align top

    .reply-info
      display inline-block
      margin-left 5px
      width 90%
      @media screen and (max-width: 1200px) {
        width 80%
      }

      .reply-input
        min-height 20px
        line-height 22px
        padding 10px 10px
        color #ccc
        background-color #fff
        border-radius 5px

        &:empty:before
          content attr(placeholder)

        &:focus:before
          content none

        &:focus
          padding 8px 8px
          border 2px solid blue
          box-shadow none
          outline none

    .reply-btn-box
      height 25px
      margin 10px 0

      .reply-btn
        position relative
        float right
        margin-right 15px

  .my-comment-reply
    margin-left 50px

    .reply-input
      width flex

  .author-title:not(:last-child)
    border-bottom: 1px solid rgba(178, 186, 194, .3)

  .author-title
    padding 10px

    .header-img
      display inline-block
      vertical-align top

    .author-info
      display inline-block
      margin-left 5px
      width 60%
      height 40px
      line-height 20px

      > span
        display block
        cursor pointer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis

      .author-name
        color #000
        font-size 18px
        font-weight bold

      .author-time
        font-size 14px

    .icon-btn
      width 30%
      padding 0 !important
      float right
      @media screen and (max-width: 1200px) {
        width 20%
        padding 7px
      }

      > span
        cursor pointer

      .iconfont
        margin 0 5px

    .talk-box
      margin 0 50px
      > p
        margin 0
      .reply
        font-size 16px
        color #000
    .reply-box
      margin 10px 0 0 50px
      background-color #efefef
</style>
