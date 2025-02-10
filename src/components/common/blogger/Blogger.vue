<template>
  <div class="widget rounded" v-loading="loading">
    <div class="a">
      <div class="info">
        <div class="block center">
          <a href="">
            <el-avatar :size="80" src="https://img2.baidu.com/it/u=1805099034,3809068841&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1712422800&t=04d0da1790b88556633279c04f2425ae"></el-avatar>
            <!-- <img style="width: 100%;height: 100%;" :src="blogger.avatarPath" alt=""> -->
          </a>
          <div>
            {{ blogger.nickName }} &nbsp;
            <span class="attention" @click="subscribe(true)" v-if="!isSubscribed" title="订阅以便得到ta最新的动态"><i class="el-icon-plus"></i>订阅</span>
            <span class="attention subscribed" @click="subscribe(false)" v-else title="已订阅，将得到ta的最新动态"><i class="el-icon-check"></i>已订阅</span>
          </div>
        </div>
        <div class="personal-info">
          <el-row>
            <el-col :span="12">
              <div class="center"><span>{{ blogger.beenViews }}</span>被访问</div>
            </el-col>
            <el-col :span="12">
              <div class="center">原创<span>{{ blogger.original }}</span></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="center"><span>{{ blogger.subscribed }}</span>被订阅</div>
            </el-col>
            <el-col :span="12">
              <div class="center">入驻<span>{{ blogger.settled }}</span>月</div>
            </el-col>
          </el-row>

          <div class="space-10"></div>
          <el-collapse accordion @change="handleChange">
            <el-collapse-item>
              <template slot="title">
                {{foldName}}
              </template>
              <el-row>
                <el-col :span="5">
                  <div class="center">个人简介:</div>
                </el-col>
                <el-col :span="19">
                  <div class="center">{{ blogger.personalProfile }}</div>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBlogger} from "network/userInfo";
  import {getCookieAuthorId} from "common/cookieUtils";
  import {checkSubscription, subscription, unSubscription} from "network/subscription";

  export default {
    name: "Blogger",
    props: {
      authorId: String,
    },
    data() {
      return {
        loading: false,
        avatarPath: '',
        blogger: {
          nickName: '未登录',
          beenViews: '0',
          original: '0',
          subscribed: '0',
          settled: '0',
        },
        isSubscribed: false,// 是否被订阅
        showMore: false,
        foldName: '展示更多'
      }
    },
    created() {
      this.loading = true;
      // this.authorId = this.$route.params.authorId;
      // this.avatarPath = this.$store.state.authorInfo.avatarPath;
      if (this.authorId == undefined || this.authorId == null || this.authorId == ''){
        this.authorId = getCookieAuthorId();
      }
      this.getUserInfo();
      this.sendToCheck();
    },
    methods: {
      handleChange(activeNames) {
        this.showMore = !this.showMore;
        if (this.showMore) {
          this.foldName = '收起';
          return;
        }
        this.foldName = '展示更多';
      },
      getUserInfo() {
        if (this.authorId == undefined || this.authorId == ''){
          this.loading = false;
          return;
        }
        getBlogger(this.authorId).then(res => {
          console.log(res,'res')
          this.blogger = res.data;
        }).finally(()=>{
          this.loading = false;
        })
      },
      subscribe(flag){
        if (flag){
          subscription(this.authorId).then(res =>{
            if (res.status == 400){
              this.$notify({
                message: res.msg,
                type: 'warning'
              });
            }else {
              this.$notify({
                message: res.msg,
                type: 'success'
              });
              this.isSubscribed = true;
            }
          })
        }else {
          unSubscription(this.authorId).then(res => {
            if (res.status == 400){
              this.$notify({
                message: res.msg,
                type: 'warning'
              });
            }else {
              this.$notify({
                message: res.msg,
                type: 'success'
              });
              this.isSubscribed = false;
            }
          })
        }
      },
      sendToCheck(){
        const authorId = getCookieAuthorId();
        if (authorId == undefined || authorId == ''){
          return ;
        }
        checkSubscription(this.authorId).then(res => {
          this.isSubscribed = res.data;
        })
      }
    }
  }
</script>

<style scoped>
  .a {
    width: 100%;
    height: 100%;
    /*height: 890px;*/
    /*background-color: #86b7fe;*/
  }

  .info {
    display: block;
  }

  .center {
    text-align: center;
  }

  .space {
    height: 50px;
  }

  .space-10 {
    height: 10px;
  }

  .personal-info span {
    font-size: 22px;
    font-weight: bold;
    color: black;
  }

  .attention{
    padding: 2px 4px;
    border: 1px solid gray;
    border-radius: 8px;
    background: black;
    color: white;
  }

  .attention:hover {
    color: white;
    background: #fd5c73;
    cursor: pointer;
  }

  .subscribed{
    color: white;
  }
</style>