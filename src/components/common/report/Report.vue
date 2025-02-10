<template>
  <Modal
      v-model="show"
      :title="calcTitle"
      @footer-hide="false"
      @on-ok="ok"
      @on-cancel="cancel">
    <el-form ref="form" :model="reportInfo" label-position="top" label-width="100%" size="mini">
      <el-form-item label="违规原因">
          <el-radio-group v-model="reportInfo.violationType"  style="padding: 10px">
            <Row>
              <Col span="6"><el-radio border label="内容涉黄"></el-radio></Col>
              <Col span="6"><el-radio border label="整治相关"></el-radio></Col>
              <Col span="6"><el-radio border label="内容抄袭"></el-radio></Col>
              <Col span="6"><el-radio border label="涉嫌广告"></el-radio></Col>
            </Row>
            <Row>
              <Col span="6"><el-radio border label="内容侵权"></el-radio></Col>
              <Col span="6"><el-radio border label="悔辱谩骂"></el-radio></Col>
              <Col span="6"><el-radio border label="其他"></el-radio></Col>
            </Row>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="详情描述">
        <el-input type="textarea" v-model="reportInfo.violationReason" maxlength="250" placeholder="详情描述,250字以内"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="reportInfo.contactDetails" placeholder="我们非常希望您可以留下你的联系方式，手机号码，微信号，QQ，邮箱等"></el-input>
      </el-form-item>
    </el-form>
  </Modal>
</template>

<script>
  import {submitReport} from "network/reportInfo";
  import {getCookieAuthorId} from "common/cookieUtils";

  export default {
    name: "Report",
    props: {
      showReportPanel: Boolean,
      reportType: Number, //【0:博客 1:论贴 2:博客评论 3:论贴评论】
      report: String,     // id

    },
    data() {
      return {
        show: false,
        reportInfo: {
          violationType: '',
          violationReason: '',
          contactDetails: '',

          report: '',
          reportType: '',
        }
      }
    },
    methods: {
      ok() {
        // this.$Message.info('Clicked ok');
        this.reportInfo.report = this.report;
        this.reportInfo.reportType = this.reportType;
        if (getCookieAuthorId() != undefined){
          this.reportInfo.authorId = getCookieAuthorId();
        }
        console.log(this.reportInfo);
        submitReport(this.reportInfo).then(res => {
          console.log(res);
          this.$Notice.success({
            title: res.msg,
            desc: ''
          });
        })
        this.$emit("closeReportPanel", false);
      },
      cancel() {
        // this.$Message.info('Clicked cancel');
        this.$emit("closeReportPanel", false);
      }
    },
    computed: {
      calcTitle() {
        switch (this.reportType) {
          case 0:
            return "举报博客";
          case 1:
            return "举报论贴";
          case 2:
            return "举报评论";
          case 3:
            return "举报评论";
          default:
            return "举报";
        }
      }
    },
    watch: {
      showReportPanel(value) {
        this.show = value;
      }
    }
  }
</script>

<style scoped>

</style>