<template>
  <div>
    <TabBar :isAction="3"></TabBar>
    <section class="main-content">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div class="col-md-12 col-sm-6">
              <!-- 搜索栏和新帖发布按钮 -->
              <div class="search">
                <Row>
                  <Col flex="auto">
                    <el-input placeholder="请输入内容，空格分隔关键词"
                              v-model="searchInput"
                              :clearable="true"
                              class="input-with-select">
                      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                  </Col>
                  <Col flex="100px">
                    <el-button class="search-button" @click="showDrawer=true">发布新帖</el-button>
                  </Col>
                </Row>
                <Drawer title="编辑新贴" placement="left" :closable="false" v-model="showDrawer" :width="50">
                  <div class="space"></div>
                  <Form :model="newPost" label-position="top">
                    <FormItem label="标题">
                      <Input v-model="newPost.postName" placeholder="建议发布前先搜索，或许就能找到答案"></Input>
                    </FormItem>
                    <FormItem label="详情">
                      <Input v-model="newPost.postDescription" type="textarea" :autosize="{minRows: 3,maxRows: 10}"
                             placeholder="请输入详情描述信息."></Input>
                    </FormItem>
                  </Form>

                  <!-- 图片显示区域 -->
                  <ul>
                    <li class="demo-upload-list" v-for="(item,index) in defaultList">
                      <div>
                        <template>
                          <img :src="item.url" style="width: 100px">
                          <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                          </div>
                        </template>
                      </div>
                    </li>
                    <li class="demo-upload-list">
                      <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :default-file-list="defaultList"
                          :on-success="handleSuccess"
                          :headers="addHeader"
                          :format="['jpg','jpeg','png']"
                          :max-size="2048"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :before-upload="handleBeforeUpload"
                          :multiple="false"
                          type="drag"
                          :action="action"
                          style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                          <Icon type="ios-camera" size="20"></Icon>
                        </div>
                      </Upload>
                    </li>
                  </ul>
                  <div class="space"></div>
                  <Button type="success" long @click="release">发布</Button>

                </Drawer>
              </div>
              <div class="space10"></div>
              <div class="forum-main" v-loading="loading">
                <ForumItem v-for="(item,index) in itemDataList" :forumItem="item" :key="index" :idCount="index + ''"/>
              </div>
              <div class="space10"></div>
              <div class="space10"></div>
              <div class="text-center">
                <Page :total="total" :page-size="6" @on-change="change" show-elevator/>
              </div>
            </div>


          </div>
          <div class="col-lg-4">
            <Blogger></Blogger>
            <PostTabs></PostTabs>
            <div class="space"></div>
            <Celebration></Celebration>

          </div>
        </div>
      </div>
    </section>

    <div class="space"></div>
    <Footer></Footer>
  </div>
</template>

<script>
  import TabBar from "components/common/tabBar/TabBar";
  import Footer from "components/content/footer/Footer";
  import ForumItem from "components/common/forum/ForumItem";

  import PostTabs from "components/content/featured/PostTabs";
  import Celebration from "components/content/celebration/Celebration";
  import Blogger from "components/common/blogger/Blogger";
  import {IMAGE_UPLOAD_URL} from "common/common_variable";
  import {getCookie} from "common/cookieUtils";
  import {releasePostInfo, query} from "network/postInfo";

  export default {
    name: "Forum",
    components: {
      TabBar,
      ForumItem,
      PostTabs,
      Celebration,
      Blogger,
      Footer
    },
    data() {
      return {
        authorId: '',
        searchInput: '',
        showDrawer: false,
        newPost: {
          postName: '', // 帖子标题
          postDescription: '',  //帖子描述
          imagePath: ''
        },
        defaultList: [
          // {
          //   'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //   'url': 'http://image.fangweb.top/Fi3tTQ29raaHdyajBN9Es8HkvzC_'
          // },
          // {
          //   'name': 'bc7521e033abdd1e92222d733590f104',
          //   'url': 'https://avatars.githubusercontent.com/u/22723262?s=48&v=4'
          // },
          // {
          //   'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //   'url': 'http://image.fangweb.top/Fi3tTQ29raaHdyajBN9Es8HkvzC_'
          // }
        ],
        imgName: '',
        uploadList: [],

        action: '',
        viewer: Object,

        loading: false,
        total: 1,
        itemDataList: [],

      }
    },
    created() {
      this.sendQuery(1,6,'');
    },
    methods: {
      handleView(index) {
        // this.viewer.view(index);
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.defaultList.splice(this.defaultList.indexOf(file),1);
      },
      handleSuccess(res, file) {
        if (res.status == 2000){
          this.defaultList.push({
            name: '图片' + (this.defaultList.length + 1),
            url: res.data
          })
          // console.log(this.defaultList);
          return;
        }
        this.$notify({
          message: res.msg,
          type: "warning"
        })
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' 太大了,不允许超过2M.'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 3;
        if (!check) {
          this.$Notice.warning({
            title: '只允许上传3张以内的照片.'
          });
        }
        return check;
      },
      release(){
        // 新帖发布
        if (this.newPost.postName == '' || this.newPost.postDescription == ''){
          this.$Notice.warning({
            title: '新帖标题和描述均不能为空.'
          });
          return;
        }
        if (this.defaultList.length > 0){
          let urls = '';
          for (let item of this.defaultList) {
            // console.log(item);
            urls = urls.concat(item.url,'-*-');
          }
          this.newPost.imagePath = urls;
        }

        releasePostInfo(this.newPost).then(res => {
          if (res.status == 2000){
            this.$Notice.success({
              title: res.msg
            });
            // 关闭抽屉，清掉数据
            this.showDrawer = false;
            for(let key in this.newPost ){
              this.newPost [key]  = ''
            }
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(0, fileList.length);
            this.defaultList.splice(0, this.defaultList.length);

            return;
          }
          this.$Notice.error({
            title: res.msg
          });
        })
      },
      sendQuery(curPage,size,keyWords) {
        query(curPage, size, keyWords).then(res => {
          // console.log(res);
          this.itemDataList = res.data.data;
          this.total = res.data.total;
        })
      },
      change(current){
        if (this.searchInput == '' || this.searchInput == undefined){
          this.searchInput = '';
        }
        this.sendQuery(current,6,this.searchInput);
      },

      search(){
        if (this.searchInput == undefined || this.searchInput == ''){
          this.$notify({
            message: "请输入关键词",
            type: "warning"
          })
          return;
        }
        this.sendQuery(1,6,this.searchInput);
      }

    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
      this.action = IMAGE_UPLOAD_URL;

      // const ViewerDom = document.getElementById('upload-image');
      // this.viewer = new Viewer(ViewerDom, {
      //   // 相关配置项,详情见下面
      //   rotatable: false,
      // });
      // Viewer.noConflict();
    },
    computed: {
      addHeader(){
        return {
          'Authorization': getCookie()
        }
      }
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

  .search-button {
    color: white;
    background: #fe5f75;
    border: 1px solid #fe5f75;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .forum-main{
    /*padding: 5px;*/
    border: 1px solid #ebebeb;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
</style>