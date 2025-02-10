<template>
  <Modal
      v-model="show"
      title="点击选择选择收藏目录"
      @loading="isLoading"
      @footer-hide="false"
      @on-ok="ok"
      @on-cancel="cancel">
    <CheckboxGroup v-model="checkList">
      <Checkbox border class="checkbox" v-for="(item,index) in favoritesList" :key="index"
                :label="item.favoritesId">{{item.favoritesName}}
      </Checkbox>
    </CheckboxGroup>
    <el-button type="text" class="checkbox button" v-if="favoritesList.length < 10" @click="newFavoritesId = true">添加收藏夹
      {{favoritesList.length}}/10
    </el-button>
    <Modal v-model="newFavoritesId" @on-ok="newOK">
      <div>
        <Input v-model="newFavoritesName" maxlength="20" show-word-limit placeholder="输入名字,必须" style="width: 90%"/>
        <Input v-model="newFavoritesIntro" maxlength="200" show-word-limit type="textarea" placeholder="输入简介"
               style="width: 90%"/>
      </div>
    </Modal>
  </Modal>
</template>

<script>
  import {query, create} from "network/favoritesBar";
  import {collect} from "network/favoriteRecord";
  import {getCookieAuthorId} from "common/cookieUtils";
  import {getCookie} from "common/cookieUtils";

  export default {
    name: "Favorite",
    props: {
      showFavoritesPanel: Boolean,
      articleId: String
    },
    data() {
      return {
        show: false,
        isLoading: false,
        authorId: String,
        favoritesList: [],
        checkList: [],//被选中的

        newFavoritesId: false,
        newFavoritesName: '',
        newFavoritesIntro: '',
      }
    },
    created() {
      this.authorId = getCookieAuthorId();
      this.getFavoritesBar();
    },
    methods: {
      getFavoritesBar() {
        if (getCookie() == undefined) {
          return;
        }
        this.isLoading = true;
        query(this.authorId).then(res => {
          this.favoritesList = res.data;
        }).finally(() => {
          this.isLoading = false;
        })
      },
      async ok() {
        let countSuccess = 0;
        for (let item of this.checkList) {
          let record = {
            "articleId": this.articleId,
            "authorId": "",
            "favoritesId": item,
            "id": ""
          };
          await collect(record).then(res => {
            if (res.status == 2000) {
              countSuccess++;
            }
          })
        }
        ;
        this.$Notice.success({
          title: '成功添加' + countSuccess + '个收藏夹，前往我的查看.'
        });
        if (countSuccess > 0) {
          this.$emit("closeFavoritesPanel", true);
        } else {
          this.$emit("closeFavoritesPanel", false);
        }
      },
      cancel() {
        this.$emit("closeFavoritesPanel", false);
      },
      newOK() {
        if (this.newFavoritesName == '') {
          this.$notify.warning({
            title: "收藏夹名字不能为空"
          })
          return;
        }
        let favoriteBar = {
          "authorId": "",
          "favoritesId": "",
          "favoritesIntro": this.favoritesIntro,
          "favoritesName": this.newFavoritesName
        }
        create(favoriteBar).then(res => {
          if (res.status == 2000) {
            this.$Notice.success({
              title: res.msg
            })
            this.getFavoritesBar();
          } else {
            this.$Notice.warning({
              title: res.msg
            })
          }
        })
      }
    },
    watch: {
      showFavoritesPanel(value) {
        // console.log('变量改变');
        this.show = this.showFavoritesPanel;
      }

    }
  }
</script>

<style scoped>
  .checkbox {
    margin: 5px;
    width: 100%;
  }

  .button {
    color: rgb(177, 170, 170);
  }
</style>