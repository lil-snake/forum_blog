<template>
  <el-dialog
      :title="uploadTitle"
      :visible="centerDialogVisible"
      width="30%"
      :show-close=false
      center>

    <el-upload
        ref="upload"
        class="upload-demo"
        :limit="limit"
        :action="uploadUrl"
        :headers="addHeader"
        :data="params"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
      <div slot="tip" class="el-upload__tip">只能上传一张，多张无效</div>
    </el-upload>

    <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpload(1)">取 消</el-button>
        <el-button type="primary" @click="closeUpload(2)">直接发布</el-button>
<!--        <el-button type="primary" @click="closeUpload()"></el-button>-->
      </span>
  </el-dialog>
</template>

<script>

// import {uploadImage} from "network/imageUpload";
import {base_url} from "common/common_variable";
import {getCookie,getCookieAuthorId} from "common/cookieUtils";

export default {
  name: "ImageUpload",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    uploadTitle: {
      type: String,
      default: "上传"
    },
    uploadUrl: {
      type: String,
      default: base_url + "/oss/upload"
    },
    articleId: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      params: {},
      returnData: {
        address: '',
        isUploadSuccess: false,
        isRelease: false,
      },

    }
  },
  created() {

  },
  computed:{
    addHeader(){
      return {
        'Authorization': getCookie()
      }
    }
  },
  methods: {
    // 上传文件之前的钩子 图片大小检验
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$notify({
          title: '警告',
          message: '图片大小不允许超过2M',
          type: 'warning'
        });
      }
      return isLt2M;
    },
    uploadSuccess(response, file, fileList){
      if (response.status == '2000'){
        this.$notify({
          message: response.msg,
          type: 'success'
        });
        this.returnData.address = response.data;
        this.returnData.isUploadSuccess = true;
        this.closeUpload();
      }else {
        this.$notify.info({
          title: '封面图片上传失败',
          message: response.msg
        });
        fileList.splice(1,1);//fileList的失败文件
      }

    },

    uploadError(err, file, fileList){
      this.$notify.error({
        message: '出错了，请联系系统管理员'
      });
    },
    closeUpload(select) {
      // this.$parent.centerDialogVisible = false;// 直接改会报错
      if (select === 2){
        this.returnData.isRelease = true;//必须设置为true，才会上传
      }
      this.$emit('item-click',this.returnData);
    }

  },
  watch: {
    articleId (newValue, oldValue) {
      this.articleId = newValue;
      // console.log(this.articleId);
      this.params['articleOrPostId'] = this.articleId;
    }
  }
}
</script>

<style scoped>

</style>