<template>
  <div>
    <div class="blog blogDetail">
      <div class="info">
        <Row>
          <Col span="24">
            <h1 class="text-title" :title="article.title">{{ article.title }}</h1>
          </Col>
        </Row>
        <div class="space"></div>
        <Row>
          <Col span="16">
            <Avatar :src="article.avatarPath" style="color: #ffffff;background-color: #ea7f7f">U</Avatar>&nbsp;
            <div class="nick-name">
              {{ nickName }}
            </div>
          </Col>
          <Col span="8">
            <div class="time">
              <span class="time-text">发布时间&nbsp; {{ article.modifiedTime }}</span>
            </div>
          </Col>
        </Row>
        <div class="space"></div>
        <Row>
          <Col span="16">
            标签:
            <Tag color="volcano" v-for="(item,index) in labels" :key="index" v-text="item"></Tag>
          </Col>
          <Col span="5">
            <div class="view-collect">
              <i class="el-icon-view"></i>&nbsp;{{ pageviews }}
              <Icon type="md-star"/>
              {{ blogCollection }}
            </div>
          </Col>
          <Col span="3">
            <div class="like" @click="likeClick">
              <Icon type="ios-thumbs-up-outline" v-if="!likeOrNot" title="喜欢就点个赞吧~"/>
              <Icon type="ios-thumbs-up" v-else title="已喜欢"/>
              {{ likes }}
            </div>
          </Col>
        </Row>
      </div>
      <div class="blog-body">
        <div v-html="article.html" class="markdown-body" v-highlight></div>
      </div>
    </div>
    <div class="space"></div>
    <div class="common-div">
      <Comment :articleId="articleId"></Comment>
    </div>
    <div class="space"></div>
    <div class="flex-box">
      <ul>
        <!-- 点赞 -->
        <li @click="likeClick">
          <div v-if="likeOrNot == false" title="喜欢该博客">
            <svg t="1645365234891" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2095" width="30" height="30">
              <path
                  d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                  p-id="2096"></path>
            </svg>
          </div>
          <div v-else title="不喜欢该博客">
            <svg t="1645365356741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2245" width="30" height="30">
              <path
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                  p-id="2246"></path>
            </svg>
          </div>
        </li>
        <li>
          <!-- 收藏 -->
          <div v-if="isCollect == false" title="收藏该博客" @click="openFavoritesPanel">
            <svg t="1645365677353" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6395" width="30" height="30">
              <path
                  d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z"
                  p-id="6396" fill="#707070"></path>
            </svg>
          </div>
          <div v-else title="取消收藏该博客" @click="cancelCollect">
            <svg t="1645365518520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="5272" width="30" height="30">
              <path
                  d="M875.157333 521.386667l74.709334-85.461334c26.090667-29.824 13.866667-67.52-24.768-76.309333L681.728 304.213333l-127.786667-214.677333c-20.288-34.069333-59.946667-34.090667-80.213333 0l-127.786667 214.677333-243.392 55.381334c-38.442667 8.746667-50.837333 46.506667-24.768 76.309333l164.394667 188.053333-22.613333 248.917334c-3.605333 39.466667 28.437333 62.805333 64.874666 47.146666l229.376-98.432-16.810666-39.210666-229.397334 98.453333c-6.698667 2.88-6.229333 3.221333-5.546666-4.096l24.256-267.093333-176.426667-201.813334c-4.757333-5.461333-4.885333-5.034667 2.133333-6.634666l261.205334-59.434667 137.173333-230.4c3.733333-6.293333 3.114667-6.293333 6.869333 0l137.152 230.4 261.205334 59.434667c7.125333 1.621333 6.954667 1.088 2.133333 6.613333l-74.709333 85.482667 32.106666 28.074666z m0 0l74.709334-85.461334c26.090667-29.824 13.866667-67.52-24.768-76.309333L681.728 304.213333l-127.786667-214.677333c-20.288-34.069333-59.946667-34.090667-80.213333 0l-127.786667 214.677333-243.392 55.381334c-38.442667 8.746667-50.837333 46.506667-24.768 76.309333l164.394667 188.053333-22.613333 248.917334c-3.605333 39.466667 28.437333 62.805333 64.874666 47.146666l229.376-98.432-16.810666-39.210666-229.397334 98.453333c-6.698667 2.88-6.229333 3.221333-5.546666-4.096l24.256-267.093333-176.426667-201.813334c-4.757333-5.461333-4.885333-5.034667 2.133333-6.634666l261.205334-59.434667 137.173333-230.4c3.733333-6.293333 3.114667-6.293333 6.869333 0l137.152 230.4 261.205334 59.434667c7.125333 1.621333 6.954667 1.088 2.133333 6.613333l-74.709333 85.482667 32.106666 28.074666z"
                  fill="#ad850a" p-id="5273"></path>
              <path
                  d="M682.666667 917.333333a192 192 0 1 0 0-384 192 192 0 0 0 0 384z m0 42.666667c-129.6 0-234.666667-105.066667-234.666667-234.666667s105.066667-234.666667 234.666667-234.666666 234.666667 105.066667 234.666666 234.666666-105.066667 234.666667-234.666666 234.666667z"
                  fill="#ad850a" p-id="5274"></path>
              <path
                  d="M769.429333 646.122667a21.333333 21.333333 0 0 1 29.930667 30.421333l-143.978667 141.653333a21.333333 21.333333 0 0 1-30.037333-0.106666l-64.426667-64.426667a21.333333 21.333333 0 0 1 30.165334-30.186667l49.472 49.472 128.853333-126.826666z"
                  fill="#ad850a" p-id="5275"></path>
            </svg>
          </div>
        </li>
        <li>
          <!-- 举报 -->
          <div title="举报！" @click="showReportPanel = true">
            <svg t="1645371875927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2860" width="30" height="30">
              <path
                  d="M362.268444 358.513778C311.296 409.372444 283.306667 477.070222 283.306667 548.977778v198.656c0 18.887111 15.246222 34.133333 34.133333 34.133333h470.584889c18.887111 0 34.133333-15.246222 34.133333-34.133333V566.613333c0-1.592889-0.113778-3.072-0.341333-4.664889 0.227556-4.323556 0.341333-8.647111 0.341333-12.970666 0-72.021333-27.989333-139.605333-78.961778-190.464-50.858667-50.858667-118.556444-78.961778-190.464-78.961778s-139.605333 28.103111-190.464 78.961778z m391.623112 190.464c0 4.892444-0.227556 10.012444-0.568889 15.018666-0.227556 3.072 0 6.144 0.568889 9.102223v140.401777H351.573333V548.977778c0-110.933333 90.225778-201.159111 201.159111-201.159111S753.891556 438.044444 753.891556 548.977778z"
                  fill="#2c2c2c" p-id="2861"></path>
              <path
                  d="M450.104889 429.397333C367.274667 498.346667 389.12 617.358222 390.030222 622.478222c3.185778 16.384 17.408 27.648 33.450667 27.648 2.161778 0 4.323556-0.227556 6.485333-0.568889 18.545778-3.527111 30.606222-21.504 27.079111-39.936-0.113778-0.796444-14.677333-84.878222 36.636445-127.658666 14.449778-12.060444 16.384-33.564444 4.323555-48.128-11.946667-14.563556-33.450667-16.497778-47.900444-4.437334zM267.264 397.880889c11.377778 0 22.414222-5.688889 28.899556-16.042667 10.012444-15.928889 5.233778-37.091556-10.808889-47.104l-53.475556-33.564444c-15.928889-10.012444-37.091556-5.233778-47.104 10.808889-10.012444 15.928889-5.233778 37.091556 10.808889 47.104l53.475556 33.564444c5.688889 3.527111 11.946667 5.233778 18.204444 5.233778zM337.692444 248.945778c5.575111 12.970667 18.204444 20.707556 31.402667 20.707555 4.437333 0 8.988444-0.910222 13.425778-2.730666 17.294222-7.395556 25.372444-27.420444 17.976889-44.828445l-24.803556-58.026666c-7.395556-17.294222-27.420444-25.372444-44.828444-17.976889-17.294222 7.395556-25.372444 27.420444-17.976889 44.828444l24.803555 58.026667zM534.983111 243.484444h1.820445c18.090667 0 33.109333-14.108444 34.019555-32.312888l3.299556-63.032889c1.024-18.773333-13.539556-34.929778-32.312889-35.84-18.773333-1.024-34.929778 13.539556-35.84 32.312889l-3.299556 63.032888c-0.910222 18.773333 13.539556 34.816 32.312889 35.84zM854.471111 815.900444H269.653333c-18.887111 0-34.133333 15.246222-34.133333 34.133334s15.246222 34.133333 34.133333 34.133333h584.817778c18.887111 0 34.133333-15.246222 34.133333-34.133333s-15.246222-34.133333-34.133333-34.133334z"
                  fill="#2c2c2c" p-id="2862"></path>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <Favorite :showFavoritesPanel="showFavoritesPanel"
              @closeFavoritesPanel="closePanel" :articleId="articleId"/>
    <Report :showReportPanel="showReportPanel" :reportType=0 :report="articleId" @closeReportPanel="closeReport"/>
  </div>
</template>

<script>
  import 'github-markdown-css/github-markdown.css';
  import {articleDetail,updateArticle} from 'network/article';
  import {getAuthorInfo} from "network/userInfo";
  import {getBlogInfo, likeBlog, unLikeBlog} from "network/blogInfo";

  import Comment from "components/content/comment/Comment";
  import {checkLike} from "network/likesRecord";
  import {getCookieAuthorId, getCookie} from "common/cookieUtils";
  import Favorite from "components/content/celebration/Favorite";
  import {check} from "network/favoriteRecord";
  import Report from "components/common/report/Report";

  export default {
    name: "BlogDetail",
    components: {
      Comment,
      Favorite,
      Report
    },
    data() {
      return {
        // md: demo,
        articleId: '',
        article: {
          articleId: "",
          attributes: 1,
          authorId: "",
          avatarPath: '',
          briefIntroduction: "",
          content: "",
          createTime: "",
          deleted: 0,
          html: '',
          label: '',
          modifiedTime: "",
          releaseOrNot: 1,
          title: "",
          views:0
        },
        likeOrNot: false,
        labels: [],
        nickName: '',
        blogViews: 0,
        pageviews: 0,
        blogCollection: 0,
        likes: 0,
        isCollect: false, // 是否收藏该博客
        showFavoritesPanel: false, // 收藏面板
        showReportPanel: false, // 举报面板
      }
    },
    created() {
      this.articleId = this.$route.params.articleId

      // 获取文章
      this.getDetail(this.articleId);
      this.getBlogInfo(this.articleId);
      this.sendAndCheck(this.articleId);
      this.checkFavorite();
    },
    computed: {},
    methods: {
      // 获取文章方法
      getDetail(id) {
        articleDetail(id).then(res => {
          if (res.data == undefined){
            this.$router.push("/notFount/404");
          }
          this.article = res.data;
          this.labels = this.article.label.split(',');
          this.blogCollection = this.article.blogCollection;
          this.likes = this.article.likes;
          this.pageviews = this.article.views;
          this.getAuthorInfo();
          document.title = this.article.title;
          this.$emit('returnData', this.article.authorId);
          var num =parseInt(this.article.views);
          this.updateArticle(this.article)
        }).catch(res => {
          console.log('获取博客详情出错');
          console.log(res);
        })
      },
      updateArticle(article){
        debugger
        updateArticle(article).then(res => {
            return
        }).catch(res => {
          console.log('更新出错了');
          console.log(res);
        })
      },
      //喜欢博客点赞
      likeClick() {
        //发送网络请求
        if (!this.likeOrNot) {
          // 未点赞
          likeBlog(this.articleId).then(res => {
              console.log(res);
              if (res.status == 6000) {
                this.$notify.info({
                  title: '提示',
                  message: res.msg
                });
                return;
              }
              this.likeOrNot = !this.likeOrNot;
              this.likes++;
              this.$notify({
                message: '收到您的喜欢啦！',
                type: 'success'
              });
            }
          )
        } else {
          unLikeBlog(this.articleId).then(res => {
            if (res.status == 6000) {
              this.$notify.info({
                title: '提示',
                message: res.msg
              });
              return;
            }
            this.likeOrNot = !this.likeOrNot;
            this.likes--;
            this.$notify({
              message: '已取消喜欢',
              type: 'success'
            });
          })
        }
      }
      ,
      getAuthorInfo() {
        getAuthorInfo(this.article.authorId).then(res => {
          // console.log(res.data);
          this.nickName = res.data.nickName;// TODO:用户图像还没处理
        }).catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
        })
      },

      getBlogInfo(articleId) {
        getBlogInfo(articleId).then(res => {
        })
      },
      sendAndCheck(articleId) {
        const authorId = getCookieAuthorId();
        if (authorId == undefined || authorId == '' || authorId == null) {
          return;
        }
        checkLike(articleId, authorId).then(res => {
          this.likeOrNot = res.data;
        })
      },
      closePanel(flag) {
        this.showFavoritesPanel = flag;
        this.checkFavorite();
      },
      openFavoritesPanel() {
        if (getCookie() == undefined) {
          this.$notify({
            message: "请先登录",
            type: "warning"
          })
          return;
        }
        this.showFavoritesPanel = true
      },
      checkFavorite() {
        if (getCookie() == undefined) {
          return;
        }
        check(this.articleId).then(res => {
          // console.log(res);
          if (res.data.length > 0) {
            this.isCollect = true;
          } else {
            this.isCollect = false;
          }

        })
      },
      cancelCollect() {
        this.$Notice.warning({
          title: '只能在我的页面里面取消收藏'
        });
      },
      closeReport(flag) {
        this.showReportPanel = flag;
      }
      // 方法结束
    },

  }
</script>

<style scoped>
  .info {
    /*height: 500px;*/
    width: 100%;
    padding: 15px;
    /*background: #88ecae;*/
  }

  .blog {
    width: 100%;
    padding: 20px 10px;
    border: 1px solid #ebebeb;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /*background: #f9f5ed;*/
  }

  .space {
    height: 10px;
  }

  .blog-info {
    /*border: 1px solid #f8f3e8;*/
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  }

  .blog-info .line-1 {
    height: 38px;
  }

  .blog-info .line-1 .avatar {
    display: inline-block;
    width: 6%;
    line-height: 38px;
  }

  .nick-name {
    display: inline-block;
    line-height: 38px;
    /*width: 40%;*/
    line-height: 38px;
  }

  .blog-info .line-1 .time {
    display: inline-block;
    width: 30%;
    line-height: 38px;
  }

  .time-text {
    color: #939395;
    line-height: 38px;
  }

  .blog-info .line-1 .view-collect {
    display: inline-block;
    width: 24%;
    line-height: 38px;
    text-align: center;
  }

  .line-2 {
    padding-bottom: 5px;
    padding-top: 5px;
  }

  .like {
    padding-right: 28px;
    text-align: right;
    cursor: pointer;
  }

  .line-2 .label {
    display: inline-block;
    width: 60%;
    padding-left: 45px;
  }

  .line-2 .label .label {
    color: #939395;
    line-height: 38px;
  }

  .text-title {
    width: 100%;
    max-width: 684px;
    overflow: hidden;
    white-space: normal; /* 正常换行显示 */
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

  /* 评论部分 */
  .common-div {
    padding: 10px;
    border: 1px solid #ebebeb;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .flex-box {
    padding: 5px;
    height: 100px;
    width: 40px;
    background: rgba(201, 201, 201, 0.5);
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  .flex-box ul {
    list-style: none;
  }

  .flex-box ul li {
    cursor: pointer;
  }
</style>